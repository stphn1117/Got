#include <iostream>
#include <fstream>
#include <sstream>
using namespace std;
/**
 * @brief Clase para la sincronizacion de archivos
 * 
 */
class Sync{
    public:
    string finalContent = "";
    string buffer = "";
    void merge(string localFilePath, string remoteFile);
    int askUser(string localFilePath);
};