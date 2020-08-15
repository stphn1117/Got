#ifndef INTERFACE_H
#define INTERFACE_H
#include <stdlib.h>
#include <iostream>
#include "nlohmannJson.hpp"
//got--> init <name>, help, add[-A] [name], commit <message>, 
//got-->status <file>, rollback <file> <commit>, reset <file>, sync <file>

class Interface{ 
    
    public:
        nlohmann::json filesAdded;
    // user
        void getCommand(int count, char * theCom[]);
        void sendComand();
    //server
        void toClient(int count, char * theCom[]);
        void fromClient();
        
        void createProject(int count, char * theCom[], int id);
        void handleCommitFile();
        void handleAddFile(char * thecom[]);
        void back(char * theCom[]);
    
};


#endif