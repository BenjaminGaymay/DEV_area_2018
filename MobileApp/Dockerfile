FROM debian:latest

WORKDIR /app

ADD . /app/

RUN mkdir /app/sharedDatas

# Install base software packages
RUN apt-get update && apt-get install software-properties-common wget curl git unzip -y yarn && apt-get clean

# Node
ENV NODE_VERSION 11.8.0
RUN cd && \
    wget -q http://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz && \
    tar -xzf node-v${NODE_VERSION}-linux-x64.tar.gz && \
    mv node-v${NODE_VERSION}-linux-x64 /opt/node && \
    rm node-v${NODE_VERSION}-linux-x64.tar.gz
ENV PATH ${PATH}:/opt/node/bin

RUN npm install react-native react-native-cli && npm install

# Java
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN add-apt-repository -y ppa:webupd8team/java
RUN apt-get update
RUN apt-get install -y oracle-java8-installer --allow-unauthenticated
RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /var/cache/oracle-jdk8-installer

ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

# SDK
ENV ANDROID_SDK_VERSION r24.4.1
ENV ANDROID_BUILD_TOOLS_VERSION build-tools-23.0.3,build-tools-23.0.2,build-tools-23.0.1,build-tools-28.0.3,build-tools-28.0.2,build-tools-28.0.1

ENV ANDROID_SDK_FILENAME android-sdk_${ANDROID_SDK_VERSION}-linux.tgz
ENV ANDROID_SDK_URL http://dl.google.com/android/${ANDROID_SDK_FILENAME}
ENV ANDROID_API_LEVELS android-23,android-28
ENV ANDROID_EXTRA_COMPONENTS extra-android-m2repository,extra-google-m2repository,extra-android-support,extra-google-google_play_services
ENV ANDROID_HOME /opt/android-sdk-linux
ENV PATH ${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools

RUN cd /opt && wget ${ANDROID_SDK_URL} && tar -xzf ${ANDROID_SDK_FILENAME} && rm ${ANDROID_SDK_FILENAME} && echo y | android update sdk --no-ui -a --filter tools,platform-tools,${ANDROID_API_LEVELS},${ANDROID_BUILD_TOOLS_VERSION} && echo y | android update sdk --no-ui --all --filter "${ANDROID_EXTRA_COMPONENTS}"

# Create APK
RUN cd /app/android && ./gradlew clean && ./gradlew assembleRelease

CMD ["cp", "/app/android/app/build/outputs/apk/release/app-release-unsigned.apk", "/app/sharedDatas/client.apk"]