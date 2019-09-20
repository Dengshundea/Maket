var express = require('express');
var router = express.Router();

var connection = require('../db/mysqlConn.js');
//引入jwt
const jwt = require('jsonwebtoken');
const secretKey = 'itsource'; //统一密钥
// 查询sql拼装
function getListSql(username, role) {
    let count = 1;
    let sql = `SELECT * FROM t_user`
    if (username && username.length > 0) {
        if (count == 1) {
            sql += ` WHERE username like '${username}%'`
        } else {
            sql += ` AND username like '${username}%'`
        }
        count++;
    }
    if (role && role.length > 0) {
        if (count == 1) {
            sql += ` WHERE role='${role}'`
        } else {
            sql += ` AND role='${role}'`
        }
    }
    sql += ' order by inputTime desc';

    console.log('--------------------');
    console.log('-------->listSql:', sql);
    console.log('--------------------');

    return sql;
}

router.get('/', function (req, res, next) {
    res.send('用户管理');
})
//用户列表
/* GET users listing. */
/*router.get('/listUser', function (req, resp) {
    // 1） 接收请求
    const {username, role} = req.query

    // 2） 处理数据
    const sql = 'SELECT * FROM `t_user`  order by inputTime desc';
    // resp.send(sql);
    // return;
    connection.query(sql, (err, result) => {
        // console.log('========================>',result);
        // 错误判断
        if (err) throw err;

        if (result.length > 0) {
            // 3） 返回结果
            resp.send(result);

        } else {
            // 3） 返回结果
            // resp.send('nok');
            resp.send([]);
        }
    });

});*/
// SQL拼装函数
function getSql(role, searchKey){
    // 1.准备
    let sql = `SELECT id,username,role,inputTime,email FROM t_user`; //role=2==> AND inputUserId=UserId
    // 是否是第一个条件的标志
    let first=true;

    // 2.执行判断
    if(role){
        if(first){ // 第一个条件
            sql+= ` WHERE role=${role}`
        }else{// 不是第一个条件
            sql+= ` AND role=${role}`
        }
        // 如果已拼接条件,这个就不再是第一个
        first=false
    }
    if(searchKey){
        if(first){ // 第一个条件
            sql+= ` WHERE username like '${searchKey}%'`
        }else{// 不是第一个条件
            sql+= ` AND username like '${searchKey}%'`
        }
        // 如果已拼接条件,这个就不再是第一个
        first=false
    }

    // 3.结果
    return sql;
}

router.post('/listUser', function (req, resp) {
    // 1. 准备
    const {role, searchKey}=req.body;
    // 2. 执行
    // 1) 准备SQL
    // const sql = `SELECT id,username,role,inputTime,email FROM t_user WHERE role=${role} AND username='${searchKey}'`
    // resp.send(getSql(role, searchKey));
    // 2) 执行SQL
    connection.query(getSql(role, searchKey), function (error, data) {
        if (error) throw error;
        // 3. 结果
        resp.send(data);
    })
});


// 用户添加
router.post('/addUser', (req, resp) => {
    // 1、接受请求参数
    //get请求头的参数
    //const {username, password} = req.query; //get请求头的参数
    //post请求头的参数
    // const params=req.body;
    // const username=params.username; //等价于下面的解构赋值
    // const password=params.password;
    // const role=params.role;
    const {username, password, role, email} = req.body; //get请求头的参数
    //2.执行
    //去重
    //1.准备sql
    const checksql = `SELECT * FROM t_user WHERE username='${username}'`;
    //2.执行sql
    connection.query(checksql, function (error, result) {
        if (error) throw error;
        if (result.length > 0) { //如果受影响的长度变化那么
            resp.send({
                success: false,
                message: '用户名重复，请重新输入!'
            })
            return; //中断掉
        } else {
            //1.准备执行sql
            const addsql = `INSERT INTO \`t_user\` (\`username\`,\`password\`, \`role\`,\`email\`) VALUES ('${username}','${password}', '${role}','${email}')`
            //2.执行sql
            connection.query(addsql, function (error, result) {
                //判断
                if (error) throw error;
                //3.结果(result)：返回消息对象
                if (result.affectedRows > 0) {
                    resp.send({
                        success: true,
                        message: '添加成功！',

                    });
                } else {
                    resp.send({
                        success: false,
                        message: '添加失败！'
                    });
                }

            })
        }
    });


});

//用户修改密码
router.post('/changePwd', (req, resp) => {
    //1.准备
    const {token, oldpassword, newpassword} = req.body;
    //2.执行
    //通过token获取用户ID
    try {
        jwt.verify(token, secretKey, (err, user) => {
            const userId = user.id;

            //3.sql               修改新密码的前提是ID必须是当前用户，密码必须是当前用户原密码
            const sqlCpw = `UPDATE t_user SET password=${newpassword} WHERE id=${userId} AND password=${oldpassword}`;
            connection.query(sqlCpw, (err, result) => {
                // 密码修改成功,必须是影响1条
                if (result.affectedRows === 1) {
                    resp.send({
                        success: true,
                        message: '密码修改成功!'
                    })
                } else {
                    resp.send({
                        success: false,
                        message: '原密码输入错误!'
                    })
                }

            });
        })
    } catch (e) {
        //4.结果
        resp.send({
            success: false,
            message: '用户登录已经失效！'
        })
    }


});

// 删除用户
router.get('/deleteUser', (req, resp) => {
    const {id} = req.query;

    const sql = `DELETE FROM t_user WHERE id='${id}'`
    connection.query(sql, (err, result) => {
        if (err) throw err;

        if (result.affectedRows === 1) {
            resp.send({
                success: true,
                message: '用户删除成功!'
            })
        } else {
            resp.send({
                success: false,
                message: '用户删除失败!'
            })
        }
    })
})

// 更新用户
router.post('/updateUser', (req, resp) => {
    const {id, email, role} = req.body;

    const sql = `UPDATE t_user SET role=${role}, email='${email}' WHERE id=${id}`
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 1) { // 影响1行,代表成功修改
            resp.send({
                success: true,
                message: '用户修改成功!'
            })
        } else {
            resp.send({
                success: false,
                message: '用户修改失败!'
            })
        }
    })
})

module.exports = router;
