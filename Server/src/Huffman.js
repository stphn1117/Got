var btree = require('./BinaryTree.js');
const md5 = require('md5');

//freqMatrix = [[frequency, "char"],
//              [frequency, "char"]]

class Huffman {

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

    generateOutput(text) {
        for (var i in text) {
            this.HuffmanTree.readTreeByText(text[i]);
        }

        //console.log(this.HuffmanTree.output);
        return this.HuffmanTree.output;
    }

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
            tabla: charCodes
        }
        
        return result;
    }

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

    decompress(textCode, charCodes) {
        this.generateTreeByCode(charCodes);
        //this.HuffmanTree.print();
        var text = this.HuffmanTree.readTreeByCode(textCode);
        return text;
    }
}
// _________________/ EXAMPLE /_________________________

module.exports.Huffman = Huffman;

var h = new Huffman();
let txt = `First off, that's not JSON. 
It's a JavaScript object literal.
JSON is a string representation of data, 
that just so happens to very closely resemble JavaScript syntax. Second, you have an object. 
They are unsorted. The order of the elements cannot be guaranteed. If you want guaranteed order, 
you need to use an array. This will require you to change your data structure.`
let result = h.compress(txt);
console.log(result);
let check = h.decompress(result.code, JSON.parse(result.tabla))
console.log(md5(check) == md5(txt))

var charCodes = { codes:
    [ { code: '010000010', char: 'F' },
     { code: '10101', char: 'i' },
     { code: '0111', char: 'r' },
     { code: '1111', char: 's' },
     { code: '0010', char: 't' },
     { code: '000', char: ' ' },
     { code: '0110', char: 'o' },
     { code: '111001', char: 'f' },
     { code: '111010', char: ',' },
     { code: '11001', char: 'h' },
     { code: '0101', char: 'a' },
     { code: '00111100', char: '\'' },
     { code: '1101', char: 'n' },
     { code: '111011', char: 'J' },
     { code: '101110', char: 'S' },
     { code: '1110000', char: 'O' },
     { code: '00111001', char: 'N' },
     { code: '001100', char: '.' },
     { code: '00111101', char: 'I' },
     { code: '0100001', char: 'v' },
     { code: '10110', char: 'c' },
     { code: '101111', char: 'p' },
     { code: '0011111', char: 'b' },
     { code: '0100010', char: 'j' },
     { code: '100', char: 'e' },
     { code: '001101', char: 'l' },
     { code: '0011101', char: 'g' },
     { code: '11000', char: 'd' },
     { code: '01001', char: 'u' },
     { code: '10100', char: 'y' },
     { code: '1110001', char: 'm' },
     { code: '01000000', char: 'x' },
     { code: '0100011', char: 'T' },
     { code: '00111000', char: 'w' },
     { code: '010000011', char: 'q' } ] }

//h.decompress("0100000101010101111111001000001101110011110011110100000010110010101001000111100111100011010110001000011101110111011100000011100100110000000111101001000111100111100001010001110110101010000101011011101011001111010110111100100000110001111101000101001011000100000011011010100101000111010100110100110000011101110111011100000011100100010101111100001010001111001001111010111010011101000011110010111101111001111100110100100101001010101011011010000110111001000110000101001001011110100000010110010101001000001000100100111110010000111101100001100101011011111011111001101111100000100110000010000110001111010000010110001101011011111000011011010000001111001111100111000100111110011011000001110110101010000101011011101011001111010110111100100001111101001101001001010100000000110000010111010010110011011011100011101000010100011001001000110010101010000110000001011101000011000111110100010100101100010001100000010001111001100101000000101011110000001001110111110110011100101001100000110000001000111100110000001100111110001000111000011011100100000101100110000010000110110011100011001101001011110001011001011101110101100010000001111110000000111010100101010111010111010010100100110000011000000011110111100100010100011001001000001110000101110100100000011101010010101011101011101001010010011000000011001111100010001111110100001010001100100100011011001001100000000100110000010011111100000010111010000101011101110101101000011000000100011110011010111110000011100010101001101001101000011110001000001101001101010111100000101000110010010000010011000010110110010101110100111011000001010001100100101110001100001010010010100011110010011101001101100010010010111100001100", charCodes);

