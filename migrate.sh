#!/bin/bash

if [ -d "./server" ]; then
  cat ./server/migrations/*.sql | sudo -u postgres psql basic_chat
else
  cat ./build/server/migrations/*.sql | sudo -u postgres psql basic_chat
fi

