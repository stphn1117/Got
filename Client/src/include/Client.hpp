#ifndef CLIENT_H
#define CLIENT_H

#include "nlohmannJson.hpp"
#include <iostream>
#include <ostream>
#include <memory>

using json = nlohmann::json;

class Client{
private:
    static std::shared_ptr<Client> instance;
    Client(){};
public:
    static std::shared_ptr<Client> getInstance();
    int init(std::string& repo_name);
    void get(int files[], std::string specifyCommit, int Time);
    //void send(vector<string> theCom, vector<string> files, string commit, string specifyCommit);
    //void commit(int repo_id, std::string author, std::string messageCommit, json files);
};

#endif