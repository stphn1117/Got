var btree = require('/home/valeria/Documents/Got/Server/src/BinaryTree.js');

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
        console.log(textByLine);
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

        console.log(this.freqMatrix);
    }

    selectLR() {

        while (this.freqMatrix.length > 1) {
            var L = this.freqMatrix[0];
            var R = this.freqMatrix[1];
            var F = [L[0] + R[0], "N" + this.nodeCounter.toString()];
            this.nodeCounter++;

            this.HuffmanTree.addByText(R, L, F, this.nodeCounter);

            this.freqMatrix.shift();
            this.freqMatrix.shift();
            this.freqMatrix.unshift(F);

            this.freqMatrix.sort(function (a, b) {
                return a[0] - b[0]
            });
            console.log(this.freqMatrix);
        }
        console.log("\n\n");
        this.HuffmanTree.print();
    }

    generateOutput(text) {
        for (var i in text) {
            this.HuffmanTree.readTreeByText(text[i]);
        }
        console.log(this.HuffmanTree.output);
        return this.HuffmanTree.output;
    }

    generateTreeByCode(charCodes){
        
        charCodes["codes"].sort(function(a, b){
            return a.code - b.code;
        });

        console.log(charCodes);
        for(var i in charCodes["codes"]){
            this.HuffmanTree.addByCode(charCodes["codes"][i]["code"], charCodes["codes"][i]["char"], this.nodeCounter);
            this.nodeCounter++;
        }
    }

    compress(text) {
        this.text = text;
        this.generateMatrix(this.frecuency(this.text));
        this.selectLR();
        this.generateOutput(this.text);
        console.log(this.HuffmanTree.codes);
        this.HuffmanTree = new btree.Tree();
    }

    decompress(textCode, charCodes) { 
        this.generateTreeByCode(charCodes);
        this.HuffmanTree.print();

    }
}

var h = new Huffman();
//h.compress("EEDDDGGGGAAAAA");
var charCodes = { codes: 
    [ { code: '110', char: 'E' },
      { code: '111', char: 'D' },
      { code: '10', char: 'G' },
      { code: '0', char: 'A' } ] };

h.decompress("1101101111111111010101000000", charCodes);