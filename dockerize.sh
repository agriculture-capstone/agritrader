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
elif [ "$1" == "run" ]; then
	docker run --rm -v $DIR:$DOCKER_HOME -t \
		$IMAGE_NAME npm run "${@:2}"
else
	echo "usage: docker_build [init | lint]"
fi

