const diff = require("diff");

const oldText =
    `
La cosa más difícil es conocernos a nosotros mismos;
la más fácil es hablar mal de los demás (Tales de Mileto)

No puedo enseñar nada a nadie. Solo puedo hacerles pensar (Sócrates)

No juzgamos a las personas que amamos (Jean-Paul Sartre)

El conocimiento es poder (Francis Bacon)

El amor inmaduro dice: “te amo porque te necesito”. 
El maduro dice: “te necesito porque te amo” (Erich Fromm)
`;

const newText =
    `
La cosa más difícil es conocernos a nosotros mismos; 
la más fácil es hablar mal de los demás (Tales de Mileto)

No juzgamos a las personas que amamos (Jean-Paul Sartre)

El amor inmaduro dice: “te amo porque te necesito”. 
El maduro dice: “te necesito porque te amo” (Erich Fromm)

La peor lucha es la que no se hace (Karl Marx)

La pobreza no viene por la disminución de las riquezas, 
sino por la multiplicación de los deseos (Platón)

No lastimes a los demás con lo que te causa dolor a ti mismo (Buda)
`;

const fileName = "src/main.cpp";

let patch = [];
patch = getDiff(fileName, oldText, newText);
applyDiff(oldText, patch);

function getDiff(fileName, oldText, newText){
    let patch = diff.createPatch(fileName, oldText, newText);
    let patchArray = [];
    patchArray = patch.split("\n");

    let structure = [];
    let array_diff = [];
    let stringDiff = "";

    let n = 0;
    let line = "";
    let newLine = "";
    for(let i=5; i < patchArray.length; i++){
        if(patchArray[i].startsWith("-")){
            line = patchArray[i];
            newLine = line.substr(1, line.length);
            structure.push({
                "line": n,
                "operation": "delete",
                "content": newLine
            });
        }
        if(patchArray[i].startsWith("+")){
            line = patchArray[i];
            newLine = line.substr(1, line.length);
            structure.push({
                "line": n,
                "operation": "add",
                "content": newLine
            });
            n++;
        }
        else{
            if(patchArray[i].startsWith("-")){}
            else{
                structure.push({
                    "line": n,
                    "operation": "equal",
                    "content": ""
                });
                n++;
            }
        }
    }

    n = 0;
    for(let i=5; i < patchArray.length; i++){
        if(patchArray[i].startsWith("-")){
            line = patchArray[i];
            newLine = line.substr(1, line.length);
            array_diff[n] = newLine;
            n++;
        }
        if(patchArray[i].startsWith("+")){
            line = patchArray[i];
            newLine = line.substr(1, line.length);
            array_diff[n] = newLine;
            n++;
        }
    }

    stringDiff = array_diff.join();

    let result = {
        "stringDiff": stringDiff,
        "structure": structure
    }

    console.log("Result of getDiff()");
    console.log(result);
    return result;
}


function applyDiff(text, patch){
    console.log("\n\nBefore:")
    console.log(text);

    myObj = patch;
    structure = myObj.structure;
    text_Lines = text.split("\n");
    stringResult = "";

    for(let i=0; i<structure.length; i++){
        if(structure[i].operation === "add"){
            insertAt(text_Lines, structure[i].line, structure[i].content);
        }

        if(structure[i].operation === "delete"){
            for(let j=0; j<text_Lines.length; j++){
                if(text_Lines[j] === structure[i].content){
                    text_Lines.splice(j, 1);
                }
            }
        }
    }

    console.log("After:");
    for(let i=0; i<text_Lines.length; i++){
        stringResult += text_Lines[i] + "\n";
    }

    console.log(stringResult);
    return stringResult;
}

function insertAt(array, index, ...elementsArray){
    array.splice(index, 0 , ...elementsArray)
}

/*function getDiff(fileName, oldText, newText){
    let jsdiff = diff.createPatch(fileName, oldText, newText);
    let parsedPatch = diff.parsePatch(jsdiff);
    return JSON.stringify(parsedPatch);
}

function applyDiff(text, patch){
    let normalPatch = JSON.parse(patch);
    text = diff.applyPatch(text, normalPatch);
    return text;
}*/

module.exports = { getDiff, applyDiff, insertAt};

