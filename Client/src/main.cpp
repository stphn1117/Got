#include <iostream>
#include "include/Client.h"
#include "include/Inteface.h"
using namespace std;
int main(int argc, char* argv[]){
    std::cout<<"Estamos por comenzar"<<std::endl;
    
    Client c;
    /*std::string command;
    while(command != "-1"){
        std::cout<<"command: ";
        std::getline(std::cin, command);
        c.init(command);
    }*/

    //json files = {{"src/main.cpp", "Hello world"},{"resources/data.txt", "xd"}};
    json file = {{"src/main.cpp", "Hello world"}};
    //c.commit(2, "testing SpiritTemple", files);
    std::cout<<"\n";
    c.get(5, 67, file, "status");
    
    /*
    Interface input;
    for (int i = 0; i < argc; ++i) {
        if(i == 4){
            printf(" \n too much arguments, write help to get more information \n");
        }
    }

    input.getCommand(argc, argv);*/


    /*
    Client c;
    c.sendFiles();
    */
    return 0;
}