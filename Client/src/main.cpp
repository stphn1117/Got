#include <iostream>
#include "include/Client.hpp"
#include "include/Interface.hpp"
#include "include/utilities.hpp"
#include "include/Sync.hpp"
int main(int argc, char *argv[])
{
    if (argc == 1)
    {
        ce::debuglog("no command given");
        exit(0);
    }
    Interface input;
    for (int i = 0; i < argc; ++i)
    {
        if (i == 4)
        {
            ce::log(" \n too many arguments, write help to get more information \n");
        }
    }
    
    input.getCommand(argc, argv);

    return 0;
}