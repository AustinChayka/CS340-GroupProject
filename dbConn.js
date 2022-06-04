var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : '[user]',
  password        : '[pass]',
  database        : '[db]'
});
module.exports.pool = pool;