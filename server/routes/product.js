/*
	商品模块路由
*/ 
var express = require('express');
var router = express.Router();

// 引入数据库连接模块
const connection = require('../db/mysqlConn')

/* 商品列表 */ 
router.get('/getProductList', (req, res) => {
	// 接收参数

	// 构造sql
	const sqlStr = `SELECT * FROM t_product `; //order by id desc

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.length > 0) {
			res.send(data) // 响应成功的数据给前端
		} else {
			res.send([]) // 响应失败的数据给前端
		}
	})
})

/*商品添加*/
router.post('/addProduct',(req,resp)=>{
	//1.获取
	 const {shoplist,shopName,shopPrice,marketPrice} = req.body;
	//2.执行
	const sqladd=`INSERT INTO t_product (shoplist,shopName,shopPrice,marketPrice) VALUES ('${shoplist}','${shopName}','${shopPrice}','${marketPrice}')`;
	connection.query(sqladd,function (err,result) {
		if(err)throw err;
		if(result.affectedRows===1){
            //3.结果
            resp.send({
				success:true,
				message:'添加成功！'
			})
		}else{
            //3.结果
            resp.send({
                success:false,
                message:'添加失败！'
			})
		}
    })

})
/* 商品分页

	结果
	    {
			data： LIMIT 的结果
			total： 

		}
*/
/*router.get('/queryPage', (req, resp)=>{
	// 1. 接收请求
	const {pageSize, currentPage} = req.query
	console.log('---------------->',pageSize, currentPage)
	const start = (currentPage-1)*pageSize
	// 2. 处理数据
	const sql = `SELECT * FROM t_product LIMIT ${start},${pageSize}`
	// resp.send(sql);
	connection.query(sql,(err, result)=>{
		if(err) throw err;

		if(result.length>0){ // 有结果

			// 进行统计查询
			const countSql = "SELECT COUNT(id) total FROM t_product"
			connection.query(countSql,(err, countResult)=>{
				resp.send({
					data : result,
					total : countResult[0].total
				});

			})

		}else{ // 没结果
			resp.send([]);

		}

	})
	// 3. 响应结果
})*/



module.exports = router;