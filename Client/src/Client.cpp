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
int Client::init(std::string& repoName)
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