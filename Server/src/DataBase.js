let mysql = require("mysql");

class DataBase {
    static #mysqlInfo = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'GOT',
        insecureAuth: true
    }
    static addRepo(){

    }
    static addChanges(){

    }
    static add
    static addCommit
    static test() {
        let connection = mysql.createConnection(this.#mysqlInfo);
        connection.query("show tables",(err, res)=>{
            console.log(res);
        })
        connection.end();
    }
}
DataBase.test();