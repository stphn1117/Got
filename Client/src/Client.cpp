#include "include/Client.hpp"
#include "include/nlohmannJson.hpp"
#include <memory>
#include <cpr/cpr.h>
#include "include/utilities.hpp"
using json = nlohmann::json;

std::shared_ptr<Client> Client::instance = nullptr;
std::shared_ptr<Client> Client::getInstance()
{
    if (instance == nullptr)
    {
        instance = std::shared_ptr<Client>(new Client());
    }
    return instance;
}
int Client::init(std::string repoName)
{
    ce::debuglog(repoName);
    json req={{"name", repoName}};
    ce::debuglog(req.dump());
    auto res = cpr::Post(
        cpr::Url{url + "/init"},
        cpr::Header{{"Content-Type", "application/json"}},
        cpr::Body{req.dump()});

    json response = json::parse(res.text);
    if (response["status"].get<std::string>() == "failed")
    {
        return -1;
    }
    else
    {
        return response["id"].get<int>();
    }
}
int Client::commit(int repoId, std::string message, json addFiles, json changeFiles)
{

    return 0;
}
/*
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