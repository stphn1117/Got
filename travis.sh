# Configuration for SonarCloud
#SONAR_TOKEN= # access token from SonarCloud projet creation page -Dsonar.login=XXXX: here it is defined in the environment through the CI
SONAR_PROJECT_KEY=sonarcloud_example_cpp-cmake-linux-otherci # project name from SonarCloud projet creation page -Dsonar.projectKey=XXXX
SONAR_PROJECT_NAME=sonarcloud_example_cpp-cmake-linux-otherci # project name from SonarCloud projet creation page -Dsonar.projectName=XXXX
SONAR_ORGANIZATION=sonarcloud # organization name from SonarCloud projet creation page -Dsonar.organization=ZZZZ

# Set default to SONAR_HOST_URL in not provided
SONAR_HOST_URL=${SONAR_HOST_URL:-https://sonarcloud.io}

mkdir $HOME/.sonar
export SONAR_SCANNER_VERSION=4.2.0.1873
export SONAR_SCANNER_HOME=$HOME/.sonar/sonar-scanner-$SONAR_SCANNER_VERSION-linux

# download sonar-scanner
curl -sSLo $HOME/.sonar/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip > /dev/null 2>&1
unzip -o $HOME/.sonar/sonar-scanner.zip -d $HOME/.sonar/ > /dev/null 2>&1
export PATH=$SONAR_SCANNER_HOME/bin:$PATH
export SONAR_SCANNER_OPTS="-server"

# download build-wrapper
curl -sSLo $HOME/.sonar/build-wrapper-linux-x86.zip https://sonarcloud.io/static/cpp/build-wrapper-linux-x86.zip > /dev/null 2>&1
unzip -o $HOME/.sonar/build-wrapper-linux-x86.zip -d $HOME/.sonar/ > /dev/null 2>&1
export PATH=$HOME/.sonar/build-wrapper-linux-x86:$PATH

# Setup the build system
cd $HOME
git clone https://github.com/microsoft/vcpkg
cd vcpkg
./bootstrap-vcpkg.sh
./vcpkg install cpr
echo ${TRAVIS_BUILD_DIR}
cd ${TRAVIS_BUILD_DIR}
ls -a
cd Client
rm -rf build
mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=$HOME/vcpkg/scripts/buildsystems/vcpkg.cmake ..

#build inside build wrapper
cd ..
build-wrapper-linux-x86-64 --out-dir bw-output cmake --build build/ --config Release
cd ..

ls -a
# Run sonar scanner (here, arguments are passed through the command line but most of them can be written in the sonar-project.properties file)
sonar-scanner \
  -Dsonar.organization=stphn1117 \
  -Dsonar.projectKey=stphn1117_Got \
  -Dsonar.sources=Client,Server/src \
  -Dsonar.exclusions=**/nlohmannJson.hpp \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.cfamily.build-wrapper-output=Client/bw-output \
  -Dsonar.login=$SONARLOGIN
