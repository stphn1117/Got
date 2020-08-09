const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'got',
  insecureAuth : true
});
connection.end();
class database{

}
