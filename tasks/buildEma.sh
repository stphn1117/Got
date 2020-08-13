cd Client
rm -rf build
mkdir build
cd build

#cmake -DCMAKE_TOOLCHAIN_FILE=/home/stphn/vcpkg/scripts/buildsystems/vcpkg.cmake ..
#cmake -DCMAKE_TOOLCHAIN_FILE=/usr/share/vcpkg/scripts/buildsystems/vcpkg.cmake .. 
cd ..
cmake --build build/ --config Release 
cd ..
Client/build/got

echo  "ponga en el build de su nombre en tasks/build la dirección de la vara de cmake"