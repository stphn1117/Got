var btree = require('/home/valeria/Documents/Got/Server/src/BinaryTree.js');

var HuffmanTree = new btree.Tree();
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

    for (var i in freq) {
        var temp = [];
        temp.push(freq[i]);
        temp.push(i);
        freqMatrix.push(temp);
    }

    freqMatrix.sort(function (a, b) {
        return a[0] - b[0]
    });

    console.log(freqMatrix);

}

function selectLR()
{
    var L  = freqMatrix[0];
    var R = freqMatrix[1];
    var F = [L[0] + R[0], "N" + treeCounter.toString()];

    HuffmanTree.addLeft(L, F);
    HuffmanTree.addRight(R);
    HuffmanTree.print();

}

var file = readTextFile('Server/src/compress.txt');
frecuency(file);
selectLR();


