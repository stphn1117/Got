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

    addRepo(name, callback) {
        let sql = `INSERT INTO REPOSITORIO (nombre) VALUES(${name})`;
        let conn = mysql.createConnection(this.mysql);
        conn.query(sql, (err, res)=>{
            
        })
        conn.end
    }
    addChanges() {
    }
    add() { }
    addCommit(repositorio, autor, mensaje, hora) {
        let sql = `
        
        INSERT INTO COMMITS (rep_id, autor, mensaje, hora)
        VALUES ();`;
    }
    
    test() {
        let conn = mysql.createConnection(this.mysql)
        async function callback(err, result, fields){
            tables = [];
            result.forEach(x => {tables.push(x.Tables_in_GOT)});
            await conn.end();
        }
        await conn.query("show tables", callback);
    }
}

let DB = DataBase.Instance()
async function start(){
    let f = await DB.test()
    return Promise.resolve(f).then(data=>{console.log(data)});
}
console.log(start())

tablaCodigos = [
    {"codigo":01,"simbolo":"a"},
    {"codigo":2123123,"simbolo":"w"},
    {"codigo":2123123,"simbolo":"w"},
    {"codigo":2123123,"simbolo":"w"}
]
codigo=[1,2,3,4,123,10111,122210101,010101];