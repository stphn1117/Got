
var freqMatrix = [];

//freqMatrix = [[frequency, "char"],
//              [frequency, "char"]]

function readTextFile(file)
{
    var fs = require('fs');
    var textByLine = fs.readFileSync(file).toString();
    console.log(textByLine);
    return textByLine;
}

function frecuency(fileString)
{
    var freq = [];
    for (var j = 0; j < fileString.length; j++) 
    {
        var character = fileString.charAt(j);

        if (freq[character]){
            freq[character]++;

        }else {
            freq[character] = 1;
        }
    }

    for(var i in freq)
    {
        var temp = [];
        temp.push(freq[i]);
        temp.push(i);
        freqMatrix.push(temp);
    }

    freqMatrix.sort(function(a,b){
        return a[0]-b[0]
    });

    console.log(freqMatrix);

} 

var file = readTextFile('Server/src/compress.txt');
frecuency(file);

