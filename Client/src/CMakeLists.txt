cmake_minimum_required(VERSION 3.13)
project(Client)
set(CMAKE_CXX_STANDARD 14)

set(SOURCE_FILES prueba.cpp)

add_executable(Client prueba.cpp)

find_package(cpr CONFIG REQUIRED)
target_link_libraries(Client PRIVATE cpr)