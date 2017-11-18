#!/usr/bin/env bash

adb devices
adb uninstall com.agritrader
# npm run start:android && tail -f /dev/null
npm run start:android
