#include "include/Sync.hpp"
#include "include/utilities.hpp"
/**
 * @brief Realiza la comparacion y combinacion de archivos de forma interactiva
 * 
 * @param localFilePath Ubicacion del archivo local
 * @param remoteFileString Archivo remoto en forma de string
 */
void Sync::merge(std::string localFilePath, std::string remoteFileString)
{
    std::ifstream localFile(localFilePath);
    std::istringstream remoteFile(remoteFileString);
    std::string localLine;
    std::string remoteLine;
    int mergeAction;
    int lines = 0;
    int localFileLineCount = 0;
    int remoteFileLineCount = 0;

    while (getline(localFile, localLine))
    {
        localFileLineCount++;
    };
    while (getline(remoteFile, remoteLine))
    {
        remoteFileLineCount++;
    };
    localFile.clear();
    localFile.seekg(0);
    remoteFile.clear();
    remoteFile.seekg(0);
    int cnt = 0;
    while (getline(localFile, localLine) && getline(remoteFile, remoteLine))
    {
        cnt++;
        if (localLine == remoteLine)
        {
            finalContent += localLine + "\n";
        }
        else
        {
            ce::log("_______/ Versiones /_______ ", "\nLocal: " + localLine, "\nRemota: " + remoteLine);
            mergeAction = askUser(localFilePath);
            if (mergeAction == 1)
            { //Conservar local
                finalContent += localLine + "\n";
            }
            else if (mergeAction == 2)
            { //Reemplazar local por remoto
                finalContent += remoteLine + "\n";
            }
            else if (mergeAction == 3)
            { //Reemplazar local por remoto y guardar local
                finalContent += remoteLine + "\n";
                buffer += localLine + "  >>>>>>> saved from line[" + std::to_string(cnt) + "]==\n";
            }
        }
        lines++;
    }

    localFile.clear();
    localFile.seekg(0);
    remoteFile.clear();
    remoteFile.seekg(0);

    if (localFileLineCount > lines)
    {
        ce::log("Desea agregar el contenido restante del archivo local?\n1. Si\n2. No");
        std::cin >> mergeAction;

        if (mergeAction == 1)
        {
            for (int line = 0; getline(localFile, localLine); line++)
            {
                if (line >= lines && line < localFileLineCount)
                {
                    finalContent += localLine + "\n";
                }
            }
        }
    }
    else if (remoteFileLineCount > lines)
    {
        ce::log("\n¿Desea agregar el contenido restante del archivo remoto?\n1. Si\n2. No");
        std::cin >> mergeAction;

        if (mergeAction == 1)
        {
            for (int line = 0; getline(remoteFile, remoteLine); line++)
            {
                if (line >= lines && line < remoteFileLineCount)
                {
                    finalContent += remoteLine + "\n";
                }
            }
        }
    }

    //ce::log(finalContent);
    //ce::log(buffer);
    if(buffer !=""){
        finalContent += "[=== cambios locales guardados ====]\n";
    }
    std::ofstream output;
    output.open(localFilePath);
    if (output.is_open())
    {
        output << (finalContent + buffer);
    }
    output.close();
}

/**
 * @brief Permite al usuario seleccionar una forma de combinar los archivos
 * 
 * @param localFilePath Ubicacion del archivo local
 * @return int Representacion de la modalidad de merge seleccionada
 */
int Sync::askUser(std::string localFilePath)
{
    int mergeAction;
    ce::log("\nSeleccione una de las siguientes opciones para el merge del archivo ", localFilePath);
    ce::log("1. Conservar local\n2. Reemplazar local por remoto\n3. Reemplazar local por remoto y guardar local");
    std::cin >> mergeAction;
    return mergeAction;
}
