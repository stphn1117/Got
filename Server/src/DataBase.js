let mysql = require("mysql");
let util = require("util");

class DataBase {
    static #instance;
    static #inst=false;
    #mysql;
    #query_promise;
    constructor(){
        if(DataBase.#inst){throw "too many instances"}
        DataBase.#inst=true;
        this.#mysql = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'GOT',
            insecureAuth: true
        };
    }
    static Instance(){
        if(!this.#instance){
            this.#instance = new DataBase();
        }
        return this.#instance;
    }

    addRepo(name, callback) {
        let sql = `INSERT INTO REPOSITORIO (nombre) VALUES(${name})`;
        let conn = mysql.createConnection(this.#mysql);
        conn.query(sql, (err, res)=>{
            
        })
        conn.end
    }
    addChanges() {
    }
    add() { }
    addCommit(repositorio, autor, mensaje, hora) {
        let sql = `INSERT INTO COMMITS (rep_id, autor, mensaje, hora)
        VALUES (
            rep_id:int,
            'autor:varchar',
            'mensaje:varchar',
            'hora:time'
          );`;
     }
    
    test(callback) {
        let conn = mysql.createConnection(this.#mysql)
        conn.query("show tables", (err, result, fields)=>{
            let tables = []
            result.forEach(x => {tables.push(x.Tables_in_GOT)})
            callback(err, tables)
        });
        conn.end()
    }
}

let DB = DataBase.Instance()
DB.test((err, res)=>{
    console.log(res);
});



tablaCodigos = [
    {"codigo":01,"simbolo":"a"},
    {"codigo":2123123,"simbolo":"w"},
    {"codigo":2123123,"simbolo":"w"},
    {"codigo":2123123,"simbolo":"w"}
]
codigo=[1,2,3,4,123,10111,122210101,010101];