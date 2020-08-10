var btree = require('./BinaryTree.js');
var file = readTextFile('./compress.txt');
var HuffmanTree = new btree.Tree();
var textArr = [];
var freqMatrix = [];
var treeCounter = 1;

//freqMatrix = [[frequency, "char"],
//              [frequency, "char"]]

function readTextFile(file) {
    var fs = require('fs');
    var textByLine = fs.readFileSync(file).toString();
    console.log(textByLine);
    return textByLine;
}

function frecuency(fileString) {
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

function generateMatrix(freq) {
    for (var i in freq) {
        var temp = [];
        temp.push(freq[i]);
        temp.push(i);
        freqMatrix.push(temp);
        textArr.push(temp);
    }

    freqMatrix.sort(function (a, b) {
        return a[0] - b[0]
    });

    console.log(freqMatrix);
}

function selectLR() {

    while (freqMatrix.length > 1) {
        var L = freqMatrix[0];
        var R = freqMatrix[1];
        var F = [L[0] + R[0], "N" + treeCounter.toString()];
        treeCounter++;

        HuffmanTree.add(R, L, F, treeCounter);

        freqMatrix.shift();
        freqMatrix.shift();
        freqMatrix.unshift(F);

        freqMatrix.sort(function (a, b) {
            return a[0] - b[0]
        });
        console.log(freqMatrix);
    }
    console.log("\n\n");
    HuffmanTree.print();
}

function generateOutput() {
    console.log(textArr);
    var output = HuffmanTree.readTree("G");
    return output;
}

function HuffmanCode() {
    generateMatrix(frecuency(file));
    selectLR();
    generateOutput();
}

HuffmanCode();


