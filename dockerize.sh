#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMAGE_NAME="boresha/agritrader"
DOCKER_HOME="/agritrader"
ARG_NUM=2

if [ "$1" == "init" ]; then
	docker build -t $IMAGE_NAME $DIR
elif [ "$1" == "install" ]; then
	docker run --rm -v $DIR:$DOCKER_HOME -t \
		$IMAGE_NAME yarn install
elif [ "$1" == "adb" ]; then
	adb stop-server
	docker run --rm -v $DIR:$DOCKER_HOME -t \
		--device=${@:2} \
		$IMAGE_NAME adb devices
elif [ "$1" == "android" ]; then
	adb stop-server
	docker run --rm -v $DIR:$DOCKER_HOME -t \
		--device=${@:2} \
		$IMAGE_NAME ./build-apk.sh
elif [ "$1" == "bash" ]; then
	docker run --rm \
		-v $DIR:$DOCKER_HOME  \
		--device=${@:2} \
		-it $IMAGE_NAME /bin/bash
else
	echo "usage: docker_build [init | lint]"
fi

