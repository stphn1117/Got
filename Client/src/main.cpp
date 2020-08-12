#include <iostream>
#include "include/Client.h"
#include "include/Inteface.h"
using namespace std;
int main(int argc, char* argv[]){

    
    Interface input;
    for (int i = 0; i < argc; ++i) {
        if(i == 4){
            printf(" \n too much arguments, write help to get more information \n");
        }
    }

    input.getCommand(argv);


    /*
    Client c;
    c.sendFiles();
    */
    return 0;
}
/*

*/