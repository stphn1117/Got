#include <iostream>
#include <string.h>
#include <fstream>
#include <sys/stat.h>
#include "include/Inteface.h"
#define BUZZ_SIZE 1024

using namespace std;

//ifstring(include para txt)
//got--> init <name>, help, add[-A] [name], commit <message>, 
//got-->status <file>, rollback <file> <commit>, reset <file>, sync <file>
void handleFile(char **command);


void Interface::getCommand(char **command){
    if(strcmp(command[1], "help") == 0) {
        printf(" instructions:\n\n init <name>\n\n add [-A] [name]\n\n commit <message>\n\n reset <file>\n\n sync<file>\n\n");
    }else{
        handleFile(command);
    }
}



void handleFile(char **command){

    if(strcmp(command[1], "init") == 0){
        int status;
        status = mkdir("../Got", S_IRWXU | S_IRWXG | S_IROTH | S_IXOTH);

        ofstream file;
        file.open("../Got/.gotignore");

        file << "gotignore files";
        file.close();
        printf("\n new project created \n");
        /*

        read file

        std::ifstream file(".gotignore");
        if(file.is_open())
        std::cout << file.rdbuf(); 
        */

    }
        
}