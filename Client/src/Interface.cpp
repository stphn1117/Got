#include <iostream>
#include <string.h>
#include <memory>
#include <fstream>
#include <sys/stat.h>

#include "include/utilities.hpp"
#include "include/Interface.hpp"
#include "include/Client.hpp"
//#include "include/dtl/dtl.hpp"
//#include "dtl/dtl.hpp"

#define BUZZ_SIZE 1024

int dirFile;

void Interface::getCommand(int count, char **command){
    if(strcmp(command[1], "help") == 0) {
        printf(" instructions:\n\n init <name>\n\n add [-A] [name]\n\n commit <message>\n\n reset <file>\n\n sync<file>\n\n");
    }else if(strcmp(command[1], "init") == 0){
        
        createFile(count, command,12);
    }else if(strcmp(command[1], "commit") == 0){
        handleCommitFile();
    }else if(strcmp(command[1], "rollback") == 0 || strcmp(command[1], "reset") == 0){
        //back();
    }else if(strcmp(command[1], "test") == 0){
        toClient(count, command);
    }else{
        //ask to server
    }
}

void Interface::createFile(int count, char **command, int id){
        char root[4] = "../";

        //create directory
        strcat(root,command[2]);
        ce::debuglog("Root Directory :", root);
        //dirFile = mkdir(root, S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH);
        std::ofstream file;

        //create .gotignore
        //char root2[30] = "../";
        //std::string Root= "../";
        std::string gotIgnore = "./.gotignore";
        std::string myCom = command[2];
        std::string fullRot = gotIgnore;
        file.open(fullRot);
        file << "gotignore files";
        file.close();
        ce::log("project created");

        //create metadata json
        std::ofstream metadataFile;
        std::string metaPath = "./.metadata.json";
        metadataFile.open(metaPath);
        metadataFile.close();
            

        //check Id projects, create new id
    
        
        json metadata;
        metadata["id"]= 212;
        metadata["repoName"]= command[2];
        metadata["tracked"] ="";
        
        metadataFile << metadata;
        metadataFile.close();
        printf("\n new project created\n");
}


void Interface::handleCommitFile(){
    //array de archivos
        //read file
        std::ifstream file("../Got/miprueba.js");
        if(file.is_open())
        std::cout << file.rdbuf(); 
}


void Interface::toClient(int count, char **commands){
}