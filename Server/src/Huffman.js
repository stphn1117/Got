var btree = require('/home/valeria/Documents/Got/Server/src/BinaryTree.js');

//freqMatrix = [[frequency, "char"],
//              [frequency, "char"]]

class Huffman {

    constructor(text){
        this.text = text;
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

            this.HuffmanTree.add(R, L, F, this.nodeCounter);

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
            this.HuffmanTree.readTree(text[i]);
        }
        console.log(this.HuffmanTree.output);
        return this.HuffmanTree.output;
    }

    compress() {
        this.generateMatrix(this.frecuency(this.text));
        this.selectLR();
        this.generateOutput(this.text);
    }
}

var h = new Huffman("EEDDDGGGGAAAAA");
h.compress();