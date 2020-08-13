cd Client
rm -rf build
mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=/usr/share/vcpkg/scripts/buildsystems/vcpkg.cmake .. 
cd ..
cmake --build build/ --config Release 
cd ..
Client/build/got