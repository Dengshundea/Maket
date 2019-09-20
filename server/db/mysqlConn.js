// 1、 引入mysql模块
var mysql = require('mysql');


// 2、 配置mysql连接
const connection =  mysql.createConnection({
    host: '127.0.0.1', // 数据库地址,如果是IP，必须在数据库中配置外部支持
		user: 'root', // 用户名
		password: 'root', // 密码
		database: 'supermarket' // 数据库名
})
console.log('数据库连接成功！');

// 3. 连接到数据库方法为
 connection.connect();

// 4. 导出模块
module.exports = connection;