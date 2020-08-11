#ifndef INTERFACE_H
#define INTERFACE_H
#include <stdlib.h>
//got--> init <name>, help, add[-A] [name], commit <message>, 
//got-->status <file>, rollback <file> <commit>, reset <file>, sync <file>

class Interface{
    public:

        char command[7];
        void getCommand(char * theCom[]);
        void sendComand();
        void readFile();
    
};


#endif