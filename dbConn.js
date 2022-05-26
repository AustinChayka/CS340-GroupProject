var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_chaykaa',
  password        : '6961',
  database        : 'cs340_chaykaa'
});
module.exports.pool = pool;