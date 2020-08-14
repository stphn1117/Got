#include <cpr/cpr.h>
#include "nlohmannJson.hpp"
#include <iostream>
#include <ostream>
using namespace std;
using json = nlohmann::json;

class Client
{
public:
    void init(std::string repo_name);
    void commit(int repo_id, std::string messageCommit, json files);
    void get(int repo_id, int commit_id, json file, std::string command);
};