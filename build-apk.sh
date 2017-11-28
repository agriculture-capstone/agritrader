#!/usr/bin/env bash

mkdir ~/.gradle/
cp gradle.properties ~/.gradle/
cd android && ./gradlew assembleRelease
