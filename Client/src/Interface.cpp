#include <iostream>
#include <string.h>
#include <memory>
#include <fstream>
#include <sys/stat.h>
#include <dirent.h>
#include <string>
#include <filesystem>
#include "include/utilities.hpp"
#include "include/Interface.hpp"
#include "include/Client.hpp"
#include "include/list.hpp"
#include "include/nlohmannJson.hpp"

//Tareas comprobar lo de json files
//agreagar directorios raiz

namespace fs = std::filesystem;

json metadata;
json TrackFiles(json filesToTrack);

/**
 * @brief Obtiene el comando ejecutado por el cliente y llama a las respectivas funciones relacionadas
 * 
 * @param count 
 * @param command Comando ingresado por el usuario
 */
void Interface::getCommand(int count, char **command)
{
    if (strcmp(command[1], "help") == 0)
    {
        ce::log("instructions:\n\n");
        ce::log("init <name> : ", "intilialize a repository on the remote server\n\n");
        ce::log("add [-A] [name] : ", "add a file to the tracked list on next commit\n\n");
        ce::log("commit <message>: ", "send performed changes to server\n\n");
        ce::log("reset <file> :" ,"return file to the last commit\n\n");
        ce::log("sync<file> :" ,"syncronize server and local versions \n\n");
        ce::log("status <file> :" ,"check for new files, changes and deletions \n\n");
    }
    else if (strcmp(command[1], "init") == 0)
    {
        std::string repoName(command[2]);
        int id = Client::getInstance()->init(repoName);
        createProject(count, command, id);
    }
    else if (strcmp(command[1], "Add") == 0)
    {
        handleAddFile(command);
    }
    else if (strcmp(command[1], "commit") == 0)
    {
        std::string message(command[2]);
        Client::getInstance()->commit(message);
    }
    else if (strcmp(command[1], "rollback") == 0)
    {   
        std::string filex(command[2]);
        std::string commit(command[3]);
        Client::getInstance()->rollback(filex,commit);
    }
    else if (strcmp(command[1], "reset") == 0)
    {
        std::string filex(command[2]);
        Client::getInstance()->reset(filex);
    }
    else if (strcmp(command[1], "sync") == 0)
    {
        std::string filex(command[2]);
        Client::getInstance()->sync(filex);
    }
    else
    {
        ce::debuglog("the command isn't correct, execute help command");
    }
}

/**
 * @brief Recolecta los archivos de un directorio especifico
 * 
 * @param filesToTrack json que contiene los archivos de seguimiento
 * @return json conjunto de archivos 
 */
json TrackFiles(json filesToTrack)
{

    std::string path = "./";
    for (const auto &entry : fs::recursive_directory_iterator(path))
        filesToTrack.push_back(entry.path());
    return filesToTrack;
}

/**
 * @brief Inicializa un nuevo repositorio en el cliente, crea el archivo .gotignore y el archivo que contiene la metadata del proyecto en Got
 * 
 * @param count 
 * @param command Nombre del repositorio 
 * @param id Identificador del repositorio
 */
void Interface::createProject(int count, char **command, int id)
{
    //create .gotignore
    std::ofstream file;
    std::string gotIgnore = "./.gotignore";
    file.open(gotIgnore);
    file << "gotignore files";
    file.close();
    ce::log("gotignore created");
    //create metadata json
    std::ofstream metadataFile;
    std::string metaPath = "./.metadata.json";
    metadataFile.open(metaPath);
    //update metadata
    std::string files;
    DIR *dp;
    struct dirent *ep;
    dp = opendir("./");
    nlohmann::json filesTrack;
    metadata["id"] = id;
    metadata["lastCommitId"] = "nocommit";
    metadata["repoName"] = command[2];
    metadata["tracked"] = json::array();
    metadata["add"] = TrackFiles(filesTrack);
    metadataFile << metadata;
    metadataFile.close();
    ce::log(" new project created");
}

/**
 * @brief Maneja la funcion de agregar archivos al proyecto
 * 
 * @param command Comando ingresado por el usuario
 */
void Interface::handleAddFile(char **command)
{
    FILE *file;
    if (strcmp(command[2], "All") == 0)
    {

        filesAdded.push_back(TrackFiles(filesAdded));
        ce::log(filesAdded);
    }
    else
    {
        if (file = fopen(command[2], "r"))
        {
            fclose(file);
            Interface::filesAdded.push_back(command[2]);
            ce::log("file added");
        }
        else
        {
            ce::log("file doesn't exist");
        }
    }
}
