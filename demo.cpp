
void Client::commit(int repo_id, std::string author, std::string messageCommit, json addFiles, json changes){
    ->creo commit al server
    ->for(ruta x in addFiles){
        -> abre el archivo
        -> lee contenido
        -> llama al rest a agregar archivo (x, contenido del archivo)
    }
    ->for(ruta x in changes){
        -> abre el archivo
        -> lee contenido
        -> llama al rest a diff archivo (x, contenido del archivo)
    }
}