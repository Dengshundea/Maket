var express = require('express');
var router = express.Router();

var connection = require('../db/mysqlConn.js');

//引入jwt
const jwt = require('jsonwebtoken');
const secretKey = 'itsource'; //统一密钥

router.post('/checkLogin', function(req, resp) {
    // 1） 准备
    let {username,password} =req.body;
    // 2） 执行
    const sql = `SELECT * FROM t_user WHERE username='${username}' AND password='${password}'`;

    connection.query(sql, (err, result)=>{

        // 错误判断
        if(err) throw err;

        if(result.length===1){
            //获取用户
            let user = result[0];
            //user = Object.assign({},user);
            //sign方法创建一个token，就等于开辟了一个空间，存储user

            //sign('第一个参数需缓存的简单对象','第二个密钥','第三个数组，里面包括配置对象：option和返回值token')
            const tokenId =jwt.sign({
                id:user.id, //修改密码需要ID
                username:user.username, //登录需要用户名
                role:user.role //登录需要角色

            },secretKey);
            // 3） 返回结果
            resp.send({
                success:true,
                message:'登录成功!',
                token:tokenId
            });
        }else{
            // 3） 返回结果
            resp.send({
                success:false,
                message:'用户名或密码错误!'
            });
        }
    });

});

//根据令牌，获取当前登录用户的信息
router.post('/getCurrentUsername',(req,resp)=>{
    //1.准备
    const tokenId = req.body.token;
    //2.执行 从内存拿出需要的信息s
    try {
        jwt.verify(tokenId,secretKey,function (error,user) {
            //if(error)throw error;
            //3.结果
            resp.send({
                success:true,
                username:user.username
            })
        })
    }catch (error) {
        //3.结果
        resp.send({
            success:false,
            message:'登陆信息已失效！',
        })
    }

})

//根据令牌，获取当前登录角色的信息
router.post('/getCurrentUserRole',(req,resp)=>{
    //1.准备
    const tokenId = req.body.token;
    //2.执行 从内存拿出需要的信息s
    try {
        jwt.verify(tokenId,secretKey,function (error,user) {
            //if(error)throw error;
            //3.结果
            resp.send({
                success:true,
                role:user.role
            })
        })
    }catch (error) {
        //3.结果
        resp.send({
            success:false,
            message:'登陆信息已失效！',
        })
    }

})
module.exports = router;
