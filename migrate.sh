#!/bin/bash

cat ./server/migrations/* | sudo -u postgres psql basic_chat 2> /dev/null