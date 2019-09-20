var express = require('express');
var router = express.Router();

var connection = require('../db/mysqlConn.js');

/* GET users listing. */
router.get('/listUser', function(req, resp, next) {
    // 1） 接收请求

    // 2） 处理数据
    const sql = 'SELECT * FROM `t_user` ';
    connection.query(sql, (err, result)=>{
        // console.log('========================>',result);
        // 错误判断
        if(err) throw err;

        if(result.length>0){
            // 3） 返回结果
            resp.send(result);
            
        }else{
            // 3） 返回结果
            resp.send('nok');
        }
    });

});


// 用户添加
router.post('/user/addUser', (req, resp)=>{
    // 1、接受请求参数
    const {username, password, role} = req.body;
    console.log('------------->username:',username);
    console.log('------------->password:',password);
    console.log('------------->userGroup:',role);
    
    
    // 2、处理请求
        // 2.1 用户添加第一步：  验证用户名是否重复
        const sql = `SELECT * FROM t_user WHERE username='${username}'`
        console.log('------------------->sql:',sql);
        
        connection.query(sql , (err, result)=>{
            // 判断结果
            if(err) throw err;

            // 判断
            if(result.length === 1){
                resp.send({
                    success : false,
                    message : '用户名已存在，请重新输入！'
                })
            }else { // 新用户名可用
                // 2.2 用户添加第二步：  用户的添加
                const addSql = `INSERT INTO t_user(username,password,role) VALUES('${username}','${password}',${role})`
                // console.log('----------------->addSql:',addSql);
                connection.query(addSql,(err, result)=>{
                    if(err) throw err;
                    
                    // 3、 响应结果
                    // 判断是否成功添加了1条数据
                    if(result.affectedRows === 1){

                        resp.send({
                            success : true,
                            message : '用户添加成功！'
                        })
                    }else{
                        resp.send({
                            success : false,
                            message : '用户添加失败，请联系管理员！'
                        })
                    }
                })
            }
        })

    // resp.send('用户添加....')

})


module.exports = router;
