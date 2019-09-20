var express = require('express');
var router = express.Router();

// var jwt = require('jsonwebtoken');
//
// var connection = require('../db/mysqlConn.js');
// var secretKey = 'itsource';


// 参数1：地址
/*// 参数2：请求回调
router.get('/', function (req, resp) {
  // 参数1：EJS模板文件
  // 参数2：渲染页面所需要的数据对象
  resp.render('指令解析V-TEXT', { 'title': '我是supermarket的服务器1！' })
});
/!* GET home page. *!/
// router.get('/login', function(req, res, next) {
// console.log('req.query.username:',req.query.username); // get
// console.log('req.query.password:',req.query.password); // get
// }
router.post('/login', function (req, resp, next) {
  const { username, password } = req.body;

  // 1. 接收数据
  //  console.log('req.body.username:',req.body.username); // post
  //  console.log('req.body.password:',req.body.password); // post

  // 2. 处理数据
  // 参数1：sql语句
  // 参数2：执行回调
  const sql = `SELECT * FROM t_user WHERE username='${username}' AND password='${password}'`;
  //  const sql = `SELECT * FROM t_user `; 
  console.log('------------------------------------>sql:', sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length === 1) {  // 登录验证，有且只有1个才算登录
      // console.log('---------------------->结果：',result);
      // resp.send(result);
      // resp.send('ok');

      // 使用jwt来生成令牌
      const user = result[0];
      // 生成令牌
      // 参数1： 保持的对象信息
      // 参数2： 秘钥
      // 参数3： 配置，expiresIn设置失效时间
      const tokenId = jwt.sign(Object.assign({}, {
        // 只缓存需要使用的信息
        id : user.id,  // 用户ID
        username : user.username, // 用户名
        userGroup : user.userGroup  // 用户小组【角色】
      }), secretKey, {
        expiresIn: 60 * 1   // 过期时间，数字：单位为S ，字符串：单位为ms
      });
      // console.log(user);

      resp.send({
        success: true,
        message: '恭喜，登录成功！',
        token: tokenId,
        userGroup: user.userGroup
      });
    } else {
      // console.log('---------------------->结果：没有数据！！！');
      // resp.send('没有数据！！！');
      resp.send('nok');

    }

  })
  // 3. 返回结果
  //  res.send(`用户名:${req.body.username},密码：${req.body.password}`);
});
router.get('/logout', function (req, resp, next) {
 resp.send({});
});


// 获取当前登录用的名字
router.post('/getCurrentUserName', (req, resp) => {
  // 1、接受请求参数
  const token = req.body.token;
  // 2、处理请求
  //  通过tokenid获取之前放入的内容（decode）
  // 参数1 ： tokenid
  // 参数2 ： 秘钥
  // 参数3 ： 获取结果的回调
  try { // 把可能会报错的代码放入try代码块中
    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) throw err;

      resp.send(decoded.username);
    });
  } catch (error) { // 如果上面代码报错，会自动进入catch
    resp.send('未登录');
  }

  // 3、 响应结果
})*/

module.exports = router;
