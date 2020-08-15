#include "include/Client.hpp"
#include "include/nlohmannJson.hpp"
#include <memory>
#include <sstream>
#include <fstream>
#include "include/utilities.hpp"
#include "include/Sync.hpp"

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

/**
 * @brief Obtiene el ultimo commit que se encuentra en el archivo metadata
 *
 * @return json Ultimo commit
 */
json Client::getMetaData()
{
    std::ifstream ifs("./.metadata.json");
    json metadata;
    ifs >> metadata;
    return metadata;
}
int Client::overwriteMetaData(json newData){
    std::ofstream output;
    output.open("./.metadata.json");
    if (output.is_open())
    {
        output << newData;
    }
    output.close();
    return 0;
}

/**
 * @brief Sirve para el comando got init, envia la informacion de un nuevo repositorio para que este sea inicializado en el servidor
 *
 * @param repoName Nombre del nuevo repositorio
 * @return int Estado de la operacion del cliente
 */
int Client::init(std::string &repoName)
{
    json req = {{"name", repoName}};
    auto res = cpr::Post(cpr::Url{url + "/init"}, jsonHeader, cpr::Body{req.dump()});
    json response = json::parse(res.text);
    if (response["status"].get<std::string>() == "failed")
        return -1;
    else
        return response["id"].get<int>();
}
int Client::commit(std::string& message)
{
    json metaData = getMetaData();
    json addFiles = metaData["add"];
    json changeFiles = metaData["tracked"];

    json newFileList;
    json changedFileList;
    ce::debuglog("adding files");
    for (auto file_route : addFiles)
    {
        std::ifstream ifs(file_route.get<std::string>());
        std::string content((std::istreambuf_iterator<char>(ifs)),
                            (std::istreambuf_iterator<char>()));
        json file = {{"route", file_route.get<std::string>()},
                     {"contents", content}};
        newFileList.push_back(file);
    }
    ce::debuglog("adding changes to files");
    for (auto file_route : changeFiles)
    {
        std::ifstream ifs(file_route.get<std::string>());
        std::string content((std::istreambuf_iterator<char>(ifs)),
                            (std::istreambuf_iterator<char>()));
        json file = {{"route", file_route.get<std::string>()},
                     {"contents", content}};
        changedFileList.push_back(file);
    }
    ce::debuglog("making the commit json");
    json commitJson = {{"repo_id", metaData["id"].get<int>()},
                       {"message", message},
                       {"previous_commit", metaData["lastCommitId"].get<std::string>()},
                       {"add_files", newFileList},
                       {"changed_files", changedFileList}};
    //cpr post
    auto res = cpr::Post(cpr::Url{url + "/commit"}, jsonHeader, cpr::Body{commitJson.dump()});
    json response = json::parse(res.text);
    for(auto file : addFiles){
        changeFiles.push_back(file);
    }
    metaData["add"].clear();
    metaData["tracked"] = changeFiles;
    metaData["lastCommitId"] = response["commit_id"].get<std::string>();
    overwriteMetaData(metaData);
    return 0;
}

int Client::rollback(std::string& route, std::string& commit)
{
    json req = {{"file_route", route},
                {"commit_id", commit}};
    auto res = cpr::Get(cpr::Url{url + "/rollback"}, jsonHeader, cpr::Body{req.dump()});
    json response = json::parse(res.text);
    json content = response["content"];
    std::ofstream output;
    output.open(route);
    if (output.is_open())
    {
        output << content;
    }
    output.close();
    return 0;
}
int Client::reset(std::string& route)
{
    json req = {{"file_route", route}};
    auto res = cpr::Get(cpr::Url{url + "/rollback"}, jsonHeader, cpr::Body{req.dump()});
    json response = json::parse(res.text);
    json content = response["content"];
    std::ofstream output;
    output.open(route);
    if (output.is_open())
    {
        output << content;
    }
    output.close();
    return 0;
}
int Client::sync(std::string& route)
{
    json req = {{"file_route", route}};
    auto res = cpr::Get(cpr::Url{url + "/sync"}, jsonHeader, cpr::Body{req.dump()});
    json response = json::parse(res.text);
    json content = response["content"].get<std::string>();
    Sync sc;
    sc.merge(route, content);
    return 0;
}
int Client::status(std::string route){
    json metadata = getMetaData();
    
    if(route!=""){
        std::string id = metadata["lastCommitId"];
        json tracked;
        json req = {{"tracked"},{"commit_id"}};
        return 0;
    }else{
        return 0;
    }
}