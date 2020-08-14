function encodedFile(commitId,ruta,huffmanCode,huffmanTree){
	this.commit = commitId;
	this.ruta = ruta;
	this.huffmanCode = huffmanCode;
	this.huffmanTree = huffmanTree;
}
module.exports.encodedFile

function fileChange(commitId, archivoId, diff_output){
	this.commit = commitId;
	this.archivo = archivoId;
	this.diff = diff_output;
}
module.exports.fileChange