#include "include/Client.h"
#include <iostream>
using namespace std;
using json = nlohmann::json;

void Client::send(vector<string> command, vector<string> files, string commit, string specifyCommit){


json output;
output["command"] = command;
output["files"] = files;
output["messajeCommit"] = commit;
output["commit"]= specifyCommit;

/*
    nlohmann::json output ={
        {"command", "input"},
        {"files", "nameFiles"},
        {"messajeCommit", "mymessage"},
        {"commit", "SpecifyCommit"}
    };

*/
    auto res = cpr::Post(
            cpr::Url{"http://localhost:3000/api"},
            cpr::Header{{"Content-Type", "application/json"}},
            cpr::Body{output.dump()}
            );

    //cpr::Response r = cpr::Get(cpr::Url{"http://localhost:3000"});
    //cpr::Response r = cpr::Post(cpr::Url{"http://locahost:3000/api"});

}

void Client::get(int *files, string specifyCommand,int Time){
    //getting files and info
}