cmake_minimum_required(VERSION 3.13)
project(Client)
set(CMAKE_CXX_STANDARD 14)


set(INC src/include)
set(SOURCE_FILES src/Client.cpp src/Interface.cpp src/main.cpp)
set(HEADERS ${INC}/Client.h ${INC}/Interface.h ${INC}/nlohmannJson.hpp)

add_executable(got ${SOURCE_FILES})
find_package(cpr CONFIG REQUIRED)
target_link_libraries(got PRIVATE cpr)

