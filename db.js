var mysql = require('mysql');
var db = mysql.createConnection({
    host     : '127.0.01',
    user     : 'root',
    password : '111111',
    database : 'opentutorials'
  });
db.connect();
module.exports = db;
