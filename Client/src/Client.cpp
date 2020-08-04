#include "include/Client.h"
using namespace std;

void Client::prueba(){
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