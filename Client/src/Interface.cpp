#include <iostream>
#include <string.h>
#include <memory>
#include <fstream>
#include <sys/stat.h>
#include <dirent.h>
#include <filesystem>

#include "include/utilities.hpp"
#include "include/Interface.hpp"
#include "include/Client.hpp"
#include "include/list.hpp"
#include "include/nlohmannJson.hpp"
//#include "include/dtl/dtl.hpp"
//#include "dtl/dtl.hpp"





void Interface::getCommand(int count, char **command){
    if(strcmp(command[1], "help") == 0) {
        ce::debuglog(" instructions:\n\n init <name>\n\n add [-A] [name]\n\n commit <message>\n\n reset <file>\n\n sync<file>\n\n");
    }else if(strcmp(command[1], "init") == 0){
        std::string repoName(command[2]);
        if(std::filesystem::exists(".metadata.json")){
            ce::log("there's an active repository in this folder");
            return;
        }
        int id = Client::getInstance()->init(repoName);
        if(id!=-1){
            createFile(count, command,id);
        }else{
            ce::log("choose another repository name!!!");
        }
        
    }else if(strcmp(command[1], "commit") == 0){
        handleCommitFile();
    }else if(strcmp(command[1], "rollback") == 0 || strcmp(command[1], "reset") == 0){
        
    }else if(strcmp(command[1], "test") == 0){
        toClient(count, command);
    }else{
        //ask to server
    }
}

void Interface::createFile(int count, char **command, int id){


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


        if (dp != NULL)
        {       
            while (ep = readdir (dp))
            //puts (ep->d_name);
            filesTrack.push_back(ep->d_name);
            (void) closedir (dp);
        }
        else
            perror ("Couldn't open the directory");

            
        json metadata;
        metadata["id"]= id;
        metadata["repoName"]= command[2];
        metadata["tracked"] = filesTrack;
        
        metadataFile << metadata;
        metadataFile.close();
        ce::log(" new project created");
        
}


void Interface::handleCommitFile(){
        std::ifstream file("../Got/miprueba.js");
        if(file.is_open())
        std::cout << file.rdbuf(); 
}


void Interface::toClient(int count, char **commands){
}