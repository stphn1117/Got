const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'prueba',
  insecureAuth : true
});
connection.end();
class database{

}
