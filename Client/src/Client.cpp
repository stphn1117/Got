#include "include/Client.h"
#include <iostream>
using namespace std;

void Client::sendFiles(){

    nlohmann::json output ={
        {"command", "input"},
        {"files", "nameFiles"},
        {"messajeCommit", "mymessage"},
        {"commit", "SpecifyCommit"}
    };


    auto res = cpr::Post(
            cpr::Url{"http://localhost:3000/api"},
            cpr::Header{{"Content-Type", "application/json"}},
            cpr::Body{output.dump()}
            );

    //cpr::Response r = cpr::Get(cpr::Url{"http://localhost:3000"});
    //cpr::Response r = cpr::Post(cpr::Url{"http://locahost:3000/api"});

}