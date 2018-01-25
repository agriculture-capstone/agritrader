FROM node:8.9.1

# Install Java
RUN \
    echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee /etc/apt/sources.list.d/webupd8team-java.list  && \
    echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list  && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886  && \
    apt-get update  && \
    \
    echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections  && \
    echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections  && \
    DEBIAN_FRONTEND=noninteractive  apt-get install -y --force-yes oracle-java8-installer oracle-java8-set-default  && \
    \
    rm -rf /var/cache/oracle-jdk8-installer  && \
    apt-get clean  && \
    rm -rf /var/lib/apt/lists/*

# Install Android SDK

## Set correct environment variables.
ENV ANDROID_SDK_FILE sdk-tools-linux-3859397.zip
ENV ANDROID_HOME /usr/local/android-sdk-linux
ENV ANDROID_SDK_URL=https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip
ENV PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/23.0.1

## Install 32bit support for Android SDK
RUN dpkg --add-architecture i386 && \
    apt-get update -q && \
    apt-get install -qy --no-install-recommends \
        libstdc++6:i386 libgcc1:i386 zlib1g:i386 libncurses5:i386 unzip
## Install SDK
RUN (cd /tmp/ && \
     wget $ANDROID_SDK_URL && \
     unzip $ANDROID_SDK_FILE && \
     export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools && \
     yes | tools/bin/sdkmanager --licenses && \
     (while sleep 3; do echo "y"; done) | tools/bin/sdkmanager --sdk_root=$ANDROID_HOME "platform-tools" "platforms;android-26" && \
     rm $ANDROID_SDK_FILE)
# Install android tools and system-image.

COPY 51-android.rules /etc/udev/rules.d/51-android.rules

# Set workdir
WORKDIR /agritrader
