#include <cpr/cpr.h>
#include "nlohmannJson.hpp"
#include <iostream>
#include <ostream>
using namespace std;

int main(int argc, char** argv)
{

    nlohmann::json j= {
            {"cmd", "set-lives"},
            {"otherval",2}
    };

    auto res = cpr::Post(
            cpr::Url{"http://localhost:3000/api"},
            cpr::Header{{"Content-Type", "application/json"}},
            cpr::Body{j.dump()}
            );

    //cpr::Response r = cpr::Get(cpr::Url{"http://localhost:3000"});
    //cpr::Response r = cpr::Post(cpr::Url{"http://locahost:3000/api"});

}


