#include <iostream>
#include <string.h>
#include <fstream>
#include <sys/stat.h>
#include <dirent.h>
#include "include/Inteface.h"
#include "include/Client.h"
//#include "include/dtl/dtl.hpp"
//#include "dtl/dtl.hpp"

#define BUZZ_SIZE 1024

using namespace std;
int dirFile;

void Interface::getCommand(int count, char **command){
    if(strcmp(command[1], "help") == 0) {
        printf(" instructions:\n\n init <name>\n\n add [-A] [name]\n\n commit <message>\n\n reset <file>\n\n sync<file>\n\n");
    }else if(strcmp(command[1], "init") == 0){
        createFile(count, command);
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


void Interface::createFile(int count, char **command){
        char root[4] = "../";

        //create directory
        strcat(root,command[2]);
        cout<< "Root Directory : " << root << "\n";
        dirFile = mkdir(root, S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH);
        ofstream file;

        //create .gotignore
        char root2[30] = "../";
        std::string Root= "../";
        std::string gotIgnore = "/.gotignore";
        std::string myCom = command[2];
        std::string fullRot = Root + myCom + gotIgnore;
        file.open(fullRot);
        file << "gotignore files";
        file.close();
        printf("\n new project created \n");

        //create metadata json
        ofstream metadataFile;
        std::string metadataJ = "/.metadata.json";
        std::string metaPath = Root + myCom + metadataJ;
        metadataFile.open(metaPath);

        vector<string> files;
        DIR *dir;
        struct dirent *ent;
        if ((dir = opendir ("../Got")) != NULL) {

        //select files and directories within directory 
        while ((ent = readdir (dir)) != NULL) {
                files.push_back(ent->d_name);
                }
                    closedir (dir);
                }else {
                    perror ("");
                }
            

        //check Id projects, create new id
        

        char idProject;
        fstream idFile;
        idFile.open ("../manage.got", ios::in);
        std::cout << idFile.rdbuf();

        if (idFile.is_open()) {
            idFile.seekp(0,ios::end);
            size_t size = idFile.tellg();

            if( size == 0){   
                idFile << 1;
            }else{
                while (! idFile.eof() ) {
                        idFile >> idProject;
                        //cout << idProject << " ";
                        }
                int id = idProject;
                idFile << idProject++;
                idFile.close();
            }
        }
        cout << "Fichero manage.got inexistente" << endl;
        json metadata;
        metadata["id"]= idProject;
        metadata["repoName"]= command[2];
        metadata["tracked"] = files;
        
        metadataFile << metadata;
        metadataFile.close();
        printf("\n new project created\n");

        // sending name proyect and metadata to server
        std::ifstream inFile;
        inFile.open("../Got/.metadata.json");
        std::stringstream strStream;
        strStream << inFile.rdbuf(); //read the file
        std::string str = strStream.str();
        //string beta = fileMeta.rdbuf();
/*
        string str = "hola";
        Client c;
        c.init(command[2], str);
        */
}


void Interface::handleCommitFile(){
    //array de archivos
        //read file
        std::ifstream file("../Got/miprueba.js");
        if(file.is_open())
        std::cout << file.rdbuf(); 
}


void Interface::toClient(int count, char **commands){
    Client sending;
    vector<string> files; 
    vector<string> command;
    for (int i = 0; i < count; i++){ 
        cout << commands[i] << "\n";
        command.push_back(commands[i]);
    }
    

    DIR *dir;
    struct dirent *ent;
    if ((dir = opendir ("../Got")) != NULL) {
    //select files and directories within directory 
    while ((ent = readdir (dir)) != NULL) {
        files.push_back(ent->d_name);
    }
    closedir (dir);
    } else {
    //could not open directory
    perror ("");
    }

    sending.send(command, files, "mi commit", " commit 5, especificación" );
}