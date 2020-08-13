#include <iostream>
#include "include/Client.h"
#include "include/Inteface.h"
using namespace std;
int main(int argc, char* argv[]){
    /*
    Client c;
    std::string command;
    while(command != "-1"){
        std::cout<<"command: ";
        std::getline(std::cin, command);
        c.init(command);
    }

    json files = json::array();
    c.commit(1, "Emanuel19", "testing Got", "12/08/2020", files);
*/
    
    Interface input;
    for (int i = 0; i < argc; ++i) {
        if(i == 4){
            printf(" \n too much arguments, write help to get more information \n");
        }
    }

    input.getCommand(argc, argv);


    /*
    Client c;
    c.sendFiles();
    */
    return 0;
}
/*

*/