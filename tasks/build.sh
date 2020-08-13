cd Client
rm -rf build
mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=/home/emanue19/Downloads/vcpkg-master/scripts/buildsystems/vcpkg.cmake ..
cd ..
cmake --build build/ --config Release 
cd ..
Client/build/got