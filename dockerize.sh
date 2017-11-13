#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMAGE_NAME="boresha/agritrader"
DOCKER_HOME="/agritrader"
ARG_NUM=2

if [ "$1" == "init" ]; then
	docker build -t $IMAGE_NAME $DIR
elif [ "$1" == "lint" ]; then
	docker run --rm -v $DIR:$DOCKER_HOME -t \
		$IMAGE_NAME tslint -c tslint.json 'src/**/*.ts'
else
	echo "usage: docker_build [init | lint]"
fi

