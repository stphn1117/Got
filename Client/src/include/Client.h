#include <cpr/cpr.h>
#include "nlohmannJson.hpp"
#include <iostream>
#include <ostream>
using namespace std;

class Client
{
public:
    void get(int files[], string specifyCommit, int Time);
    void send(vector<string> theCom, vector<string> files, string commit, string specifyCommit);
};