var express = require('express');
var router = express.Router();

var connection = require('../db/mysqlConn.js');

router.get('/', function (req, res, next) {
    res.send('库存管理');
});

router.get('/shopStock', function (req, resp) {
    // 1） 接收请求
    const {username,role} = req.query

    // 2） 处理数据
    const sql = 'SELECT * FROM `t_stock` ';
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

});

router.post('/addStock', function (req, resp) {
    // 1. 准备
    const {barCode,num,price} = req.body;
    // 2. 执行
    const sql = `INSERT INTO t_stock(barCode,num,price) Values('${barCode}',${num},${price})`
    connection.query(sql,function(error,result){
        if(error)throw error;
        if(result.affectedRows>0){
            // 3. 结果
            resp.send({
                success :true,
                message:'库存添加成功'
            })

        }
    })
});

module.exports = router;












