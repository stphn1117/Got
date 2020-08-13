function encodedFile(commitId,ruta,huffmanCode,huffmanTree){
	this.commit = commitId;
	this.ruta = ruta;
	this.huffmanCode = huffmanCode;
	this.huffmanTree = huffmanTree;
}


function fileChange(commitId, archivoId, diff_output){
	this.commit = commmitId;
	this.archivo = archivoId;
	this.diff = diff_outtput;
}

