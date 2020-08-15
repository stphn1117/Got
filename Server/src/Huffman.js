var btree = require('./BinaryTree.js');
const md5 = require('md5');

//freqMatrix = [[frequency, "char"],
//              [frequency, "char"]]

/**
 * Clase para la compresion de texto mediante el algoritmo de Huffman
 */
class Huffman {

    /**
     * Representa un objeto de tipo Huffman
     * @constructor
     */
    constructor() {
        this.text = "";
        this.HuffmanTree = new btree.Tree();
        this.freqMatrix = [];
        this.nodeCounter = 1;
    }

    readTextFile(file) {
        var fs = require('fs');
        var textByLine = fs.readFileSync(file).toString();
        //console.log(textByLine);
        return textByLine;
    }

    /**
     * Obtiene la frecuencia de cada caracter en el texto por comprimir
     * @param {string} fileString - Texto por comprimir
     */
    frecuency(fileString) {
        var freq = [];
        for (var j = 0; j < fileString.length; j++) {
            var character = fileString.charAt(j);

            if (freq[character]) {
                freq[character]++;

            } else {
                freq[character] = 1;
            }
        }
        return freq;
    }

    /**
     * Genera y ordena la matriz que contiene los caracteres y su respectiva frecuencia
     * @param {Array.<char:number>} freq - Arreglo asociativo que contiene las frecuencias
     */
    generateMatrix(freq) {
        for (var i in freq) {
            var temp = [];
            temp.push(freq[i]);
            temp.push(i);
            this.freqMatrix.push(temp);
        }

        this.freqMatrix.sort(function (a, b) {
            return a[0] - b[0]
        });

        //console.log(this.freqMatrix);
    }

    /**
     * Selecciona los primeros dos elementos de la matriz de frecuencia, los cuales representan los caracteres con menor cantidad de apariciones,
     * para posteriormente agregarlos al arbol binario HuffmanTree y reorganizar la matriz.
     */
    selectLR() {

        while (this.freqMatrix.length > 1) {
            var L = this.freqMatrix[0];
            var R = this.freqMatrix[1];
            var F = [L[0] + R[0], "N" + this.nodeCounter.toString()];
            this.nodeCounter++;

            this.HuffmanTree.addByText(R, L, F);

            this.freqMatrix.shift();
            this.freqMatrix.shift();
            this.freqMatrix.unshift(F);

            this.freqMatrix.sort(function (a, b) {
                return a[0] - b[0]
            });
            //console.log("\n\n");
            //console.log(this.freqMatrix);
        }
        //console.log("\n\n");
        this.HuffmanTree.print();
    }

    /**
     * Genera el output o codigo de Huffman del texto original medinate funciones del arbol binario
     * @param {string} text - Texto original 
     */
    generateOutput(text) {
        for (var i in text) {
            this.HuffmanTree.readTreeByText(text[i]);
        }

        //console.log(this.HuffmanTree.output);
        return this.HuffmanTree.output;
    }

    /**
     * Llama a las funciones respectivas para obtener la compresion completa del texto especificado y genera un json con el codigo del texto y
     * el codigo de cada caracter en el mismo
     * @param {string} text - Texto por comprimir
     */
    compress(text) {
        this.text = text;
        this.generateMatrix(this.frecuency(this.text));
        this.selectLR();
        let output = this.generateOutput(this.text);
        let charCodes = JSON.stringify(this.HuffmanTree.charCodes);
        //console.log(charCodes);
        this.text = "";
        this.HuffmanTree = new btree.Tree();
        this.freqMatrix = [];
        this.nodeCounter = 1;
        let result ={
            code : output,
            tabla: charCodes.replace("'",`sq`)
        }
        
        return result;
    }

    /**
     * Genera un arbol binario a partir de un JSON que contiene los codigos de Huffman de un conjunto de caracteres
     * @param {JSON} charCodes - Codigos de los caracteres
     */
    generateTreeByCode(charCodes) {

        charCodes["codes"].sort(function (a, b) {
            return a.code - b.code;
        });

       // console.log(charCodes);
        for (var i in charCodes["codes"]) {
            this.HuffmanTree.addByCode(charCodes["codes"][i]["code"], charCodes["codes"][i]["char"], this.nodeCounter);
            this.nodeCounter++;
        }
    }

    /**
     * Llama a las funciones respectivas para realizar la descompresion completa de un codigo de Huffman
     * @param {string} textCode - codigo de Huffman del texto
     * @param {JSON} charCodes - codigos de los caracteres 
     */
    decompress(textCode, charCodes) {
        charCodes = JSON.parse(charCodes.replace("sq", "'").replace("dq","\"").replace("jump", "\n"));
        this.generateTreeByCode(charCodes);
        //this.HuffmanTree.print();
        var text = this.HuffmanTree.readTreeByCode(textCode);
        return text;
    }
}

module.exports.Huffman = Huffman;
