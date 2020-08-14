#include "include/Client.hpp"
#include "include/nlohmannJson.hpp"
#include <memory>
#include <sstream>
#include <fstream>
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
json Client::getMetaData(){
    std::ifstream ifs("./.metadata.json");
    json metadata;
    ifs >> metadata;
    return metadata["lastCommit"].get<std::string>();
}
int Client::init(std::string& repoName)
{
    json req={{"name", repoName}};
    auto res = cpr::Post(cpr::Url{url + "/init"},jsonHeader,cpr::Body{req.dump()});
    json response = json::parse(res.text);
    if (response["status"].get<std::string>() == "failed")
        return -1;
    else
        return response["id"].get<int>();
}
int Client::commit(std::string message, json addFiles, json changeFiles)
{
    //file data preparations 
    json metaData = getMetaData();
    json commitJson = { {"repo_id",metaData["id"].get<int>()},
                        {"message",message},
                        {"previous_commit",metaData["lastCommitId"].get<std::string>()} };
    json newFileList;
    for(auto file_route : addFiles){
        std::ifstream ifs(file_route.get<std::string>());
        std::string content((std::istreambuf_iterator<char>(ifs)),
                            (std::istreambuf_iterator<char>()));
        json file = {{"route", file_route.get<std::string>()},
                    {"contents", content}};
        newFileList.push_back(file);
    }
    json changedFileList;
    for(auto file_route : changeFiles){
        std::ifstream ifs(file_route.get<std::string>());
        std::string content((std::istreambuf_iterator<char>(ifs)),
                            (std::istreambuf_iterator<char>()));
        json file = {{"route", file_route.get<std::string>()},
                    {"contents", content}};
        changedFileList.push_back(file);
    }
    commitJson["add_files"] = newFileList;
    commitJson["changed_files"] = changedFileList;

    //cpr post 
    auto res = cpr::Post(cpr::Url{url + "/init"},jsonHeader,cpr::Body{req.dump()});
    json response = json::parse(res.text);

    metaData["lastCommitId"]= response["commit_id"].get<std::string>();
    return 0;

}