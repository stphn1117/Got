const mysql2 = require("mysql2/promise");
const processChanges = require("./processChanges.js")
const compressor = require("./Huffman")
const util = require("util");
const md5 = require("md5");
const diff = require("diff");

/**
 * Clase para el manejo de las operaciones de la base de datos
 */
class DataBase {
    static instance;
    static inst = false;
    mysql;
    #encoder = null;

    /**
     * Representa un objeto de tipo DabaBase
     * @constructor
     */
    constructor() {
        if (DataBase.inst) { throw "too many instances" }
        this.#encoder = new compressor.Huffman();
        DataBase.inst = true;
        this.mysql = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'GOT',
            insecureAuth: true
        };
    }

    /**
     * Verifica que se cree un unico objeto de tipo DataBase, define la clase como Singleton
     */
    static Instance() {
        if (!this.instance) {
            this.instance = new DataBase();
        }
        return this.instance;
    }

    /**
     * Ejecuta las consultas realizadas a la base de datos
     * @param {query} query - Solicitud para la base de datos
     */
    async executeQuery(query, printer = false) {
        const conn = await mysql2.createConnection(this.mysql)
        const [result] = await conn.execute(query);
        conn.end();
        return result;
    }

    /**
     * Inserta una nueva instancia en la tabla REPOSITORIO con el nombre seleccionado por el usuario
     * @param {string} name - Nombre del nuevo repositorio
     */
    async insertRepo(name) {
        const result = await this.executeQuery(`INSERT INTO REPOSITORIO (nombre) VALUES ("${name}")`)
        return result.insertId;
    }

    /**
     * Inserta una nueva instancia en la tabla COMMITS con sus respectivos atributos
     * @param {string} id - Identificador del commit
     * @param {number} repoId - Identificador del repositorio
     * @param {string} parentCommit - Commit padre
     * @param {string} mensaje - Mensaje del commit ingresado por el usuario
     * @param {string} autor - autor del commit
     */
    async insertCommit(id, repoId, parentCommit, mensaje, autor = "") {
        let sql = `INSERT INTO COMMITS (id, rep_id, parent_commit, mensaje, autor)
                    VALUES ('${id}',${repoId}, '${parentCommit}', '${mensaje}', "${autor}")`;
        let updateHead = `UPDATE REPOSITORIO SET head = "${id}" WHERE id=${repoId}`
        this.executeQuery(sql);
        this.executeQuery(updateHead);
        return id;
    }

    /**
     * Inserta una nueva instancia en la tabla ARCHIVO con sus respectivos atributos
     * @param {string} ruta - Ruta del archivo por ingresar en la base de datos
     * @param {string} commit - Commit del archivo
     * @param {string} huffman_code - Codigo de Huffman del archivo
     * @param {string} huffman_table - Tabla de codigos de Huffman de los caracteres en el archivo
     */
    async insertArchivo(ruta, commit, huffman_code, huffman_table) {
        console.log(commit)
        let sql = `INSERT INTO ARCHIVO (ruta, commit_id, huffman_code, huffman_table)
                    values ("${ruta}", "${commit}", '${huffman_code}', '${huffman_table}')`
        return await this.executeQuery(sql);
    }
    async insertDiff(commit, ruta, change, newText) {
        let file = await this.getFile(ruta);
        let sql = `INSERT INTO DIFF (commit_id, archivo, diff_output, md5)
                    VALUES ("${commit}","${file.id}",'${change}','${md5(newText)}')`
        return await this.executeQuery(sql);
    }

    /**
     * Obtiene un archivo seleccionado de la tabla ARCHIVO 
     * @param {string} ruta - Ruta del archivo que se busca en la base de datos
     */
    async getFile(ruta) {
        //console.log("===============================================")
        let sql = `SELECT * FROM ARCHIVO where ruta="${ruta}"`;
        let st = await this.executeQuery(sql)
        //console.log(st)
        //console.log(st[0])
        let [file] = await this.executeQuery(sql);
        //console.log(file);
        //console.log("===============================================")
        return file;
    }

    /**
     * Obtiene los diffs del archivo especifico, y el texto inicial de dicho archivo
     * @param {string} ruta ruta del archivo en el cliente 
     * @param {string} commit id del commit hasta el cual se quiere recuperar el archivo
     */
    async getFileDiffs(ruta, commit = null) {
        let file = await this.getFile(ruta);
        console.log(file)
        let sql = `SELECT * FROM DIFF WHERE archivo ='${file.id}' ORDER BY id`;
        let diffs = await this.executeQuery(sql)
        let contents =  ""; //this.#encoder.decompress(file.huffman_code, file.huffman_table)
        console.log(JSON.parse(file.huffman_table))
        let returnVal = {
            content: contents,
            changes: []
        };
        if (!commit) {
            returnVal.changes = diffs;
        } else {
            let toApply = []
            let endfor = false;
            diffs.forEach(element => {
                if (!endfor) {
                    if (element.commit_id == commit) {
                        endfor = true;
                    }
                    toApply.push(element);
                }
            });
            returnVal.changes = toApply
        }
        return returnVal;
    }
    async getFileState(ruta, commit = null) {
        let rawFile = await this.getFileDiffs(ruta, commit);
        let finalContent = rawFile.content;
        //esto debería poder retornar el archivo hasta el estado que se solicita
        rawFile.changes.forEach((change) => {
            processChanges.applyDiff(finalContent, JSON.parse(change.diff_output));
        })
        return finalContent;
    }
    async checkFileExists(ruta) {
        let sql = `SELECT * FROM ARCHIVOS WHERE ruta='${ruta}'`
        let val = [];
        val = await this.executeQuery(sql);
        if (val.length == 0) {
            console.log("file does not exists")
            return false;
        } else {
            console.log("file exists")
            return true;
        }
    }
    async checkIfIsLastCommit(commit) {
        let sql = `SELECT * FROM COMMITS WHERE parent_commit='${commit}'`
        let val = [];
        val = await this.executeQuery(sql);
        if (val.length == 0) {
            console.log("is last commit")
            return true;
        } else {
            console.log("is not last commit")
            return false;
        }
    }
}
module.exports.DataBase = DataBase;

let a = DataBase.Instance();
//a.checkIfIsLastCommit("123")
/*async function test() {
    let f = await a.getDiffs("test.js")
}
test()
*/