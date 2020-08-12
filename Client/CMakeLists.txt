cmake_minimum_required(VERSION 3.12)
project(got VERSION 1.0.0 LANGUAGES CXX)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
INCLUDE(GNUInstallDirs)
set(DEFAULT_BUILD_TYPE "Release")

set(INC src/include)
set(SOURCE_FILES src/Client.cpp src/Interface.cpp src/main.cpp)
set(HEADERS ${INC}/Client.h ${INC}/Interface.h ${INC}/nlohmannJson.hpp)

add_executable(got ${SOURCE_FILES})
find_package(cpr CONFIG REQUIRED)
target_link_libraries(got PRIVATE cpr)

