var express = require('express');
var router = express.Router();
// 1. 引入
var jwt = require('jsonwebtoken');

const secretKey = 'itsouce'

/* GET home page. */
router.get('/signToken', function(req, res, next) {
  const user = { username: '张三',age:18,password:123 };
  const dog = { username: '旺财',age:2 };

  // 2.创建token,返回tokenId
  // 参数1:生成token时要临时存储在服务器内存中的对象
  // 参数2: 秘钥
  // jwt.sign(user, 'key1');
  // jwt.sign(dog, 'key2');
  const tokenId = jwt.sign(user, secretKey);
  res.send(tokenId);
});

/* GET home page. */
router.get('/getToken', function(req, res, next) {
  const tokenId = req.query.tokenId
// 3.获取token,通过tokenId
  // 参数1: tokenId全局钥匙
  // 参数2: secretKey秘钥,必须和加密时一样
  // 参数3: 回调函数
    // 参数1: 错误信息
    // 参数2: 获取tokenId对于的对象
  jwt.verify(tokenId, secretKey, function(err, user) {
    // console.log(decoded) // bar
    res.send(user);
  });
});

module.exports = router;
