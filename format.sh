#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

$DIR/node_modules/.bin/tslint  -c tslint.json 'src/**/*.ts'
