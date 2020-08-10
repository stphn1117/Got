# Got

Authors:

    Emanuel Marín
    Valeria Morales
    José Morales
    Stephanie Villalta
    
## Commands
Init server | node index.js

## Build Client 

cd Client
rm -rf build
mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=/usr/share/vcpkg/scripts/buildsystems/vcpkg.cmake ..
cd ..
cmake --build build/ --config Release 
cd ..
Client/build/got

added .vscode configurations to make it easier to use project in a single folder