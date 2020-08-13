#include "include/Client.h"
#include <iostream>
using namespace std;
using json = nlohmann::json;

void Client::init(std::string& repo_name){
    json output = {
        {"name", repo_name}
    };

    cpr::Response res = cpr::Post(
            cpr::Url{"http://localhost:3000/api/repo/init"},
            cpr::Header{{"Content-Type", "application/json"}},
            cpr::Body{output.dump()}
            );

    json result = json::parse(res.text);
    std::string message = result["message"];
    std::string repo_id = result["id"];
    std::cout<<message<<std::endl;
    std::cout<<"repo_id: "<<repo_id<<std::endl;
}

void Client::commit(int repo_id, std::string author, std::string messageCommit, 
    std::string date, json files){
    json output = {
        {"repo_id", repo_id},
        {"author", author},
        {"messageCommit", messageCommit},
        {"date", date},
        {"files", files}        
    };

    std::string url = "http://localhost:3000/api/repo/" + std::to_string(repo_id) + "/commit";
    cpr::Response res = cpr::Post(
            cpr::Url{url},
            cpr::Header{{"Content-Type", "application/json"}},
            cpr::Body{output.dump()}
            );

    std::cout<<res.text<<std::endl;
}

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

    cpr::Response res = cpr::Post(
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