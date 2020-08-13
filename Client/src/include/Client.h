#include <cpr/cpr.h>
#include "nlohmannJson.hpp"
#include <iostream>
#include <ostream>
using namespace std;
using json = nlohmann::json;

class Client
{
public:
    void get(int files[], string specifyCommit, int Time);
    void send(vector<string> theCom, vector<string> files, string commit, string specifyCommit);

    void init(std::string& repo_name);
    void commit(int repo_id, std::string author, std::string messageCommit, json files);
};