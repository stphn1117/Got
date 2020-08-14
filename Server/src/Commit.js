const compressor = require("./Huffman.js");
const DB = require("./DataBase.js").DataBase.Instance();
const md5 = require("md5");

/**
 * Clase para ejecutar los commits de achivos realizados por el usuario
 */
class Commit{
    #isOpen;
    #commitId=0;
    #encoder;
    
    /**
     * Representa un objeto de tipo Commit
     * @constructor
     */
    constructor(){
        this.#encoder= new compressor.Huffman();
    }

    /**
     * Realiza el commit en la base de datos y genera el ID mediante el algoritmo MD5
     * @param {number} repoId - Identificador del repositorio
     * @param {string} parentCommit - Commit padre
     * @param {string | Buffer | number[]} mensaje - Mensaje del commit
     */
    async open(repoId,parentCommit,mensaje){
        this.#isOpen = true;
        this.#commitId = md5(`${repoId}::${parentCommit}::${mensaje}::${Date.now()}`)
        await DB.insertCommit(this.commitId, repoId, parentCommit, mensaje);
        return this.#commitId;
    }

    /**
     * Cierra el commit y retorna el ID del mismo
     */
    close(){
        this.#isOpen = false;
        return this.#commitId;
    }

    /**
     * Inserta un archivo comprimido en la base de datos 
     * @param {string} ruta - Ruta del archivo por guardar
     * @param {string} contenido - Contenido del archivo
     */
    async insertArchivo(ruta, contenido){
        if(!this.#isOpen){throw "there's no open commit"}
        let cont_codificado = this.#encoder.compress(contenido);
        await DB.insert(ruta, this.#commitId, cont_codificado.code, cont_codificado.tabla)
    }

    /**
     * Inserta los nuevos cambios en la base de datos siempre y cuando el commit este abierto
     */
    async insertChange(){
        if(!this.#isOpen){throw "there's no open commit"}

    }

    /**
     * Define el estado del commit, si esta cerrado o abierto
     */
    is_open(){return this.#isOpen}
}
module.exports.Commit = Commit;