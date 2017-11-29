#!/usr/bin/env bash

mkdir ~/.gradle/
cp gradle.properties ~/.gradle/
npm run build
cd android && ./gradlew assembleRelease
