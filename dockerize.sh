#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMAGE_NAME="boresha/agritrader"
DOCKER_HOME="/agritrader"

if [ "$1" == "init" ]; then
	docker build -t "$IMAGE_NAME" "$DIR"
elif [ "$1" == "install" ]; then
	docker run --rm \
		-v "$DIR":"$DOCKER_HOME" \
		"$IMAGE_NAME" yarn install
elif [ "$1" == "adb-devices" ]; then
	# Useful to check if docker image can detect your phone at all
	docker run --rm \
		-v "$DIR":"$DOCKER_HOME" \
		--device="$2" \
		"$IMAGE_NAME" adb devices
elif [ "$1" == "android" ]; then
	docker run --rm \
		-v "$DIR":"$DOCKER_HOME" \
		--device="$2" \
		-t "$IMAGE_NAME" ./start-android.sh
elif [ "$1" == "bash" ]; then
	docker run --rm \
		-v "$DIR":"$DOCKER_HOME" \
		-it "$IMAGE_NAME" /bin/bash
elif [ "$1" == "run" ]; then
	docker run --rm \
		-v "$DIR":"$DOCKER_HOME" \
		"$IMAGE_NAME" npm run "${@:2}"
else
	echo "usage: dockerize.sh [init | install | adb [device] | android [device] | run [script] ] "
fi

