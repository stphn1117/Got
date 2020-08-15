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




void Interface::getCommand(int count, char **command){
    if(strcmp(command[1], "help") == 0) {
        ce::debuglog(" instructions:\n\n init <name>\n\n add [-A] [name]\n\n commit <message>\n\n reset <file>\n\n sync<file>\n\n");
    }else if(strcmp(command[1], "init") == 0){
            createProject(count, command,4);
    }else if(strcmp(command[1], "Add") == 0){
        handleAddFile(command);
    }else{
        ce::debuglog("the command isn't correct, execute help command");
    }
}


json TrackFiles(json filesToTrack){


        std::string path = "./";
        for (const auto & entry : fs::recursive_directory_iterator(path))
            filesToTrack.push_back(entry.path());        
return filesToTrack;
}


void Interface::createProject(int count, char **command, int id){
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
        dp = opendir ("./");
        nlohmann::json filesTrack;
        metadata["id"]= id;
        metadata["repoName"]= command[2];
        metadata["tracked"] = TrackFiles(filesTrack);
        metadataFile << metadata;
        metadataFile.close();
        ce::log(" new project created");

       
            
        
}



void Interface::handleAddFile(char **command){
    FILE *file;
    if(strcmp(command[2], "All") == 0){

    filesAdded.push_back(TrackFiles(filesAdded));
    ce::log(filesAdded);

    }else{
        if(file = fopen(command[2], "r")) {
            fclose(file);
            Interface::filesAdded.push_back(command[2]);
            ce::log("file added");
            
        } else {
            ce::log("file doesn't exist");
        }

    }
}

