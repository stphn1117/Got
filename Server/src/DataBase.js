let mysql2 = require("mysql2/promise");
let util = require("util");
const md5 = require("md5");
const diff = require("diff");




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

    async insertRepo(name, callback) {
        let sql = `INSERT INTO REPOSITORIO (nombre) VALUES ("${name}")`;
        let conn = mysql2.createConnection(this.mysql);
        

        conn.query(sql, (err, result, fields)=>{
            callback(result.InsertId);
			conn.end();
        })
    }
    /**
     * 
     * @param {id que identifica el repositorio en la metadata del cliente} repositorioId 
     * @param {autor del commit. por ahora es nulo} autor 
     * @param {mensaje a ser guardado como parte del commit} mensaje 
     * @param {hora en la que se realizó el commit} hora 
     * @param {lista de archivos a ser guardados en la base de datos} addFiles 
     * @param {lista de cambios a ser guardados sobre los archivos} changes 
     * @param {función que recibe el id del commit procesado} callback 
     */
    async addCommit(repositorioId, autor, mensaje, hora, addFiles, changes, callback) {
        let sql = `INSERT INTO COMMITS (rep_id, autor, mensaje, hora)
                VALUES (${repositorioId}, ${autor}, ${mensaje}, ${Date.now});`;

        let conn = mysql2.createConnection(this.mysql)
        conn.query(sql, (err, result, fields)=>{



			callback(result.insertId);
			conn.end();
		});
    }
	async getFile(fileId, callback){
		let sql = `SELECT * FROM ARCHIVO`;
		
    }
    async test2(){
        const conn = await mysql2.createConnection(this.mysql)
        const [result] = await conn.execute(`SHOW TABLES`);
        conn.end()
        return result;
    }
}

module.exports.DataBase = DataBase;

let DB = DataBase.Instance()

