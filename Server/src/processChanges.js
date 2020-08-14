const diff = require("diff");

function getDiff(fileName, oldText, newText){
    let jsdiff = diff.createPatch(fileName, oldText, newText);
    let parsedPatch = diff.parsePatch(jsdiff);
    let parsedStringify = JSON.stringify(parsedPatch);
    let diffEncoded = encode(parsedStringify);
    return diffEncoded;
}

function applyDiff(text, patch){
    let diffDecode = decode(patch);
    let normalPatch = JSON.parse(diffDecode);
    text = diff.applyPatch(text, normalPatch);
    return text;
}

function encode(string) {
    const buffer = new ArrayBuffer(string.length << 1);
    const view = new Uint16Array(buffer);
    for (let i = 0; i < string.length; ++i) {
      view[i] = string.charCodeAt(i);
    }
    return buffer;
}
  
function decode(buffer) {
    return String.fromCharCode.apply(null, new Uint16Array(buffer));
}

module.exports = { getDiff, applyDiff, encode, decode };

/*let old =
`
manzana
pera
piña
cereza
`
let newTxt =
`
manzana
piña
`

getDiff(old, newTxt)

function change(operacion, valor){
    let change = {
        "op": operacion,
        "valor": valor
    }
    return change;
}


let cambios = [{},{},{},{}]

cambios.forEach((element)=>{
    old.
})*/

