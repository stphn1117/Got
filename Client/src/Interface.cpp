#include <iostream>
#include <string.h>
#include <fstream>
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
    /*
    read all file
     std::ifstream infile("pruebas.txt");
    if(infile.is_open())
        std::cout << infile.rdbuf(); 
    */
    if(strcmp(command[1], "init") == 0){
        ofstream file;
        file.open("../ProjectUser/.gotignore");
        file << "gotignore files";
        file.close();
        printf("\n si esta entrando \n");

        /*
        std::ifstream file(".gotignore");
        if(file.is_open())
        std::cout << file.rdbuf(); 
        */

    }
        
}