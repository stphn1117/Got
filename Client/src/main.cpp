#include <iostream>
#include "include/Client.hpp"
#include "include/Interface.hpp"
using namespace std;
int main(int argc, char* argv[]){
    Interface input;
    for (int i = 0; i < argc; ++i) {
        if(i == 4){
            printf(" \n too much arguments, write help to get more information \n");
        }
    }
    input.getCommand(argc, argv);

    return 0;
}