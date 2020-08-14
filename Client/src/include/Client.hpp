#ifndef CLIENT_H
#define CLIENT_H

#include "nlohmannJson.hpp"
#include <iostream>
#include <ostream>
#include <memory>
#include <cpr/cpr.h>

using json = nlohmann::json;

class Client{
private:
    const cpr::Header jsonHeader;
    std::string url = "http://localhost:3000";
    static std::shared_ptr<Client> instance;
    Client():jsonHeader{cpr::Header{{"Content-Type", "application/json"}}}{};
    json getMetaData();
public:
    static std::shared_ptr<Client> getInstance();
    int init(std::string& repo_name);
    void get(int files[], std::string specifyCommit, int Time);
    int commit(std::string message);
    int rollback();
    int reset();
    int sync();
};

#endif