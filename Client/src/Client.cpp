#include "include/Client.hpp"
#include <iostream>

std::shared_ptr<Client> Client::instance  = nullptr;
std::shared_ptr<Client> Client::getInstance(){
    if(instance == nullptr){
        instance = std::shared_ptr<Client>(new Client());
    }
    return instance;
}


/*
using json = nlohmann::json;

int Client::init(std::string& repo_name){
    json info = {
        {"name", repo_name}
    }
    cpr::Response res = cpr::Post(
        cpr::Url{"http://localhost:300/init"},
        cpr::Header{{"Content-Type", "application/json"}},
        cpr::Body{output.dump()}
    );

    std::cout<<res.text<<std::endl;
}

void Client::commit(int repo_id, std::string author, std::string messageCommit, json files){
    /*json output = {
        {"repo_id", repo_id},
        {"messageCommit", messageCommit},
        {"files", files}        
    };

    std::string url = "http://localhost:3001/api/repo/" + std::to_string(repo_id) + "/commit";
    cpr::Response res = cpr::Post(
        cpr::Url{url},
        cpr::Header{{"Content-Type", "application/json"}},
        cpr::Body{output.dump()}
    );

    std::cout<<res.text<<std::endl;
}

void Client::get(int repo_id, int commit_id, json file, std::string command){
    //json file example
    json output = {
        {"repo_id", repo_id},
        {"commit_id", commit_id},
        {"file", file}
    };

    std::cout<<output<<std::endl;

    std::string url = "http://localhost:3001/api/repo/" + std::to_string(repo_id) + "/";
    if(command == "status"){url += "status";}
    else if (command == "rollback"){url += "rollback";}
    else if(command == "reset"){url += "reset";}
    else if(command == "sync"){ url += "sync";}
    else{return;}
    
    cpr::Response res = cpr::Get(
        cpr::Url{url},
        cpr::Header{{"Content-Type", "application/json"}},
        cpr::Body{output.dump()}
    );
}*/