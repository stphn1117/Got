#ifndef INTERFACE_H
#define INTERFACE_H
#include <stdlib.h>
#include <iostream>
//got--> init <name>, help, add[-A] [name], commit <message>, 
//got-->status <file>, rollback <file> <commit>, reset <file>, sync <file>

class Interface{
    public:
    // user
        void getCommand(char * theCom[]);
        void sendComand();
    //server
        void toClient(char * theCom[]);
        void fromClient();
        
        void createFile();
        void handleCommitFile();
        void addFiles();
        void back(char * theCom[]);
    
};


#endif