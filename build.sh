#!/bin/bash

set -e
rm -rf ./build 
NODE_ENV=production
BABEL_ENV=production
webpack -p --config webpack.production.config.js

babel \
  --copy-files \
  ./common/ --out-dir ./build/common

babel \
  --copy-files \
  ./server/ --out-dir ./build/server