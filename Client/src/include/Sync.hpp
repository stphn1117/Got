#include <iostream>
#include <fstream>
using namespace std;

class Sync{
    public:
    string finalContent = "";
    string buffer = "";
    
    void merge(string localFilePath, string remoteFile);
    int askUser(string localFilePath);
};