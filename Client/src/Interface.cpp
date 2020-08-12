#include <iostream>
#include <string.h>
#include <fstream>
#include <sys/stat.h>
#include "include/Inteface.h"
#include "include/Client.h"
//#include "include/dtl/dtl.hpp"
//#include "dtl/dtl.hpp"

#define BUZZ_SIZE 1024

using namespace std;
int dirFile;

void Interface::getCommand(char **command){
    if(strcmp(command[1], "help") == 0) {
        printf(" instructions:\n\n init <name>\n\n add [-A] [name]\n\n commit <message>\n\n reset <file>\n\n sync<file>\n\n");
    }else if(strcmp(command[1], "init") == 0){
        createFile();
    }else if(strcmp(command[1], "commit") == 0){
        handleCommitFile();
    }else if(strcmp(command[1], "rollback") == 0 || strcmp(command[1], "reset") == 0){
        //back();
    }else if(strcmp(command[1], "test") == 0){
        toClient(command);
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


void Interface::toClient(char **command){
    Client sending;
    int files[] = {'t', 'r', 'u', 'e'};
    sending.send(command, files, "mi commit", " commit 5, especificación" );
}