#include "./include/Sync.hpp"
#include <sstream>
using namespace std;

void Sync::merge(string localFilePath, string remoteFileString)
{
    ifstream localFile(localFilePath);
    istringstream remoteFile(remoteFileString);
    string localLine;
    string remoteLine;
    int mergeAction;
    int lines = 0;
    int localFileLineCount = 0;
    int remoteFileLineCount = 0;

    while(getline(localFile, localLine)){localFileLineCount++;};
    while(getline(remoteFile, remoteLine)){remoteFileLineCount++;};
    localFile.clear();
    localFile.seekg(0);
    remoteFile.clear();
    remoteFile.seekg(0);

    while (getline(localFile, localLine) && getline(remoteFile, remoteLine))
    {
        if (localLine == remoteLine)
        {
            Sync::finalContent += localLine + "\n";
            cout << "Same: " << localLine << endl;
            ;
        }
        else
        {
            cout << "Diff: " << localLine << "\t" << remoteLine << endl;
            mergeAction = Sync::askUser(localFilePath);
            if (mergeAction == 1)
            { //Conservar local
                Sync::finalContent += localLine + "\n";
            }
            else if (mergeAction == 2)
            { //Reemplazar local por remoto
                Sync::finalContent += remoteLine + "\n";
            }
            else if (mergeAction == 3)
            { //Reemplazar local por remoto y guardar local
                Sync::finalContent += remoteLine + "\n";
                Sync::buffer += localLine + "\n";
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
        cout << "¿Desea agregar el contenido restante del archivo local?\n1. Si\n2. No" << endl;
        cin >> mergeAction;

        if(mergeAction == 1){
            for(int line = 0; localFileLineCount-lines > line < localFileLineCount && getline(localFile, localLine) ; line++){
                if(line >= localFileLineCount-lines && line < localFileLineCount ){
                    finalContent += localLine + "\n";
                }
            }
        }
    }
    else if (remoteFileLineCount > lines)
    {
        cout << "¿Desea agregar el contenido restante del archivo remoto?\n1. Si\n2. No" << endl;
        cin >> mergeAction;

        if(mergeAction == 1){
            for(int line = 0; getline(remoteFile, remoteLine); line++){
                if(line >= remoteFileLineCount-lines && line < remoteFileLineCount ){
                    finalContent += remoteLine + "\n";
                }
            }
        }
    }

    cout << Sync::finalContent << endl;
}

int Sync::askUser(string localFilePath)
{
    int mergeAction;
    cout << "Seleccione una de las siguientes opciones para el merge del archivo " << localFilePath << endl;
    cout << "1. Conservar local\n2. Reemplazar local por remoto\n3. Reemplazar local por remoto y guardar local" << endl;
    cin >> mergeAction;
    return mergeAction;
}

