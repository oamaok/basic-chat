#!/bin/bash

cat ./server/migrations/*.sql | sudo -u postgres psql basic_chat