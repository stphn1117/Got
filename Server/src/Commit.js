const compressor = require("./Huffman.js");
const DB = require("./DataBase.js").DataBase.Instance();
const md5 = require("md5");


class Commit{
    #isOpen;
    #commitId;
    #encoder;
    constructor(){
        this.#encoder= new compressor.Huffman();
    }
    async open(repoId,parentCommit,mensaje){
        this.#isOpen = true;
        this.commitId = md5(`${repoId}::${parentCommit}::${mensaje}::${Date.now()}`)
        await DB.insertCommit(this.commitId, repoId, parentCommit, mensaje);
    }
    async close(){
        this.#isOpen = false;
    }
    async insertArchivo(ruta, contenido){
        if(!this.#isOpen){throw "there's no open commit"}
        let cont_codificado = this.#encoder.compress(contenido);
        await DB.insert(ruta, this.#commitId, cont_codificado.code, cont_codificado.tabla)
    }
    async insertChange(){
        if(!this.#isOpen){throw "there's no open commit"}

    }
    is_open(){return this.#isOpen}
}
module.exports.Commit = Commit;