#include <iostream>
#include <fstream>
#include <sstream>
/**
 * @brief Clase para la sincronizacion de archivos
 * 
 */
class Sync{
    public:
    std::string finalContent = "";
    std::string buffer = "";
    void merge(std::string localFilePath, std::string remoteFile);
    int askUser(std::string localFilePath);
};