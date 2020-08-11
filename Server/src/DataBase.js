let mysql = require("mysql");
let util = require("util");

class DataBase {
    static instance;
    static inst=false;
    mysql;
    constructor(){
        if(DataBase.inst){throw "too many instances"}
        DataBase.inst=true;
        this.mysql = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'GOT',
            insecureAuth: true
        };
    }
    static Instance(){
        if(!this.instance){
            this.instance = new DataBase();
        }
        return this.instance;
    }

    insertRepo(name, callback) {
        let sql = `INSERT INTO REPOSITORIO (nombre) VALUES ("${name}")`;
        console.log(sql)
        let conn = mysql.createConnection(this.mysql);
        conn.query(sql, (err, result, fields)=>{
            callback(result.InsertId);
        })
        conn.end()
    }
    addChanges() {
    }
    add() { }
    addCommit(repositorio, autor, mensaje, hora, callback) {
        let sql = `SELECT * FROM REPOSITORIO WHERE nombre=${repositorio}`
        let conn = mysql.createConnection(this.mysql)
        function initialQuery(err, result, fields){
            let sql = `
            INSERT INTO COMMITS (rep_id, autor, mensaje, hora)
            VALUES (${result.insertId}, ${autor}, ${mensaje}, ${hora});`;
            conn.query(sql,function giveCommitId(err, result, fields){

            })
            conn.end();
        }
        conn.query(sql, initialQuery);

    }
    
    test(callback) {
        let conn = mysql.createConnection(this.mysql)
        function queryProcess(err, result, fields){
            tables = [];
            result.forEach(x => {tables.push(x.Tables_in_GOT)});
            conn.end();
        }
        conn.query("show tables", queryProcess);
    }
}

let DB = DataBase.Instance()
console.log(DB.insertRepo("hemlo",(a)=>{
    console.log(a);
}))

tablaCodigos = [
    {"codigo":01,"simbolo":"a"},
    {"codigo":2123123,"simbolo":"w"},
    {"codigo":2123123,"simbolo":"w"},
    {"codigo":2123123,"simbolo":"w"}
]
codigo=[1,2,3,4,123,10111,122210101,010101];