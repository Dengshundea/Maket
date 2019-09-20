/*
	商品模块路由
*/ 
var express = require('express');
var router = express.Router();


// 引入数据库连接模块
// const connection = require('../db/mysqlConn')

router.get('/selldata', (req, res) => {
	res.send({
		category: ['19-06-30', '19-07-1', '19-07-2', '19-07-03', '19-07-04', '19-07-05', '19-07-06'],
		value:  [1000, 1500, 8001, 2434, 2000, 1330, 3300]
	})
})


module.exports = router;