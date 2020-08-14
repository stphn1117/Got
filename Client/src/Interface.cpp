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

//namespace fs = std::experimental::filesystem;

json metadata;
nlohmann::json filesAdded;
json TrackFiles(json filesToTrack);
int testing();

void Interface::getCommand(int count, char **command){
    if(strcmp(command[1], "help") == 0) {
        ce::debuglog(" instructions:\n\n init <name>\n\n add [-A] [name]\n\n commit <message>\n\n reset <file>\n\n sync<file>\n\n");
    }else if(strcmp(command[1], "init") == 0){
            createProject(count, command,4);
    }else if(strcmp(command[1], "commit") == 0){
            //handleCommitFile();
    }else if(strcmp(command[1], "Add") == 0){
        handleAddFile(command);
    }else if(strcmp(command[1], "test") == 0){
        //testing();
    }else{
        ce::debuglog("the command isn't correct, execute help command");
        //ask to server
    }
}


json TrackFiles(json filesToTrack){

        DIR *dp;
        struct dirent *ep;     
        dp = opendir ("./");
        if (dp != NULL)
        {       
           while (ep = readdir (dp))
            //puts (ep->d_name);
                if(strcmp(ep->d_name, "..") == 0){
                    ce::log("delete dir ..");
                }else if(strcmp(ep->d_name, ".") == 0){
                    ce::log("delete dir .");
                }else{
                    filesToTrack.push_back(ep->d_name);
                }
            (void) closedir (dp);
        }
        else
            perror ("Couldn't open the directory");

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
    //nlohmann::json filesAdded;
    FILE *file;

    if(strcmp(command[2], "All") == 0){

    TrackFiles(filesAdded);

    }else{

        if(file = fopen(command[2], "r")) {
            fclose(file);
            filesAdded.push_back(command[2]);
            ce::log("file added");
            //testing
            for (json::iterator it = filesAdded.begin(); it != filesAdded.end(); ++it) {
            std::cout << *it << '\n';
            }

        } else {
            ce::log("file doesn't exist");
        }

    }
}

void Interface::toClient(int count, char **commands){
}

