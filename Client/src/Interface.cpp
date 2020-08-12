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
        createFile();
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


void Interface::createFile(){
        //create directory
        dirFile = mkdir("../Got", S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH);
        ofstream file;
        //create .gotignore
        file.open("../Got/.gotignore");
        file << "gotignore files";
        file.close();
        printf("\n new project created \n");
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