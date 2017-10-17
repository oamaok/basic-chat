#!/bin/bash

if [ -d "./server" ]; then
  cat ./server/migrations/*.sql | psql
else
  cat ./build/server/migrations/*.sql | psql
fi

