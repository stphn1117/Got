#include <cpr/cpr.h>
#include "nlohmannJson.hpp"
#include <iostream>
#include <ostream>
#include <memory>
using namespace std;
using json = nlohmann::json;

class Client{
private:
    std::shared_ptr<Client> instance;
    Client();
{
public:
    std::shared_ptr<Client> getInstance(){
        if(instance == nullptr){
            instance = new Client
        }
    }
    void get(int files[], string specifyCommit, int Time);
    void send(vector<string> theCom, vector<string> files, string commit, string specifyCommit);

    int init(std::string& repo_name);

    void commit(int repo_id, std::string author, std::string messageCommit, json files);
};