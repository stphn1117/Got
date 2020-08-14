#include <iostream>
#include <string.h>
#include <memory>
#include <fstream>
#include <sys/stat.h>
#include <dirent.h>

#include "include/utilities.hpp"
#include "include/Interface.hpp"
#include "include/Client.hpp"
#include "include/list.hpp"
#include "include/nlohmannJson.hpp"
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


        /*
        strcat(root,command[2]);
        ce::debuglog("Root Directory :", root);
        //dirFile = mkdir(root, S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH);
        */


        //create .gotignore
         std::ofstream file;
        std::string gotIgnore = "./.gotignore";
        file.open(gotIgnore);
        file << "gotignore files";
        file.close();
        ce::log("project created");

        //create metadata json
        std::ofstream metadataFile;
        std::string metaPath = "./.metadata.json";
        metadataFile.open(metaPath);
        
        
        //create files
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
        metadata["id"]= 212;
        metadata["repoName"]= command[2];
        metadata["tracked"] = filesTrack;
        
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