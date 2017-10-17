#!/bin/bash

set -e

read -p "Enter PSQL hostname (localhost): " PGHOST
export PGHOST=${PGHOST:-"localhost"}

read -p "Enter PSQL username (postgres): " PGUSER
export PGUSER=${PGUSER:-"postgres"}

read -sp "Enter PSQL password: " PGPASSWORD
export PGPASSWORD
echo

read -p "Enter the name of the database to be created (basic_chat): " PGDATABASE
export PGDATABASE=${PGDATABASE:-"basic_chat"}

echo -n "Creating database '$PGDATABASE'... "
createdb &> /dev/null
echo "Done!"

echo -n "Cloning a fresh copy of 'Versioning'... "
rm -rf ./Versioning
git clone --depth 1 https://github.com/depesz/Versioning &> /dev/null
echo "Done!"

echo -n "Installing 'Versioning' on database '$PGDATABASE'... "
psql < ./Versioning/install.versioning.sql &> /dev/null
echo "Done!"

echo -n "Cleaning up... "
rm -rf ./Versioning
echo "Done!"

echo -n "Creating database schema... "
./migrate.sh &> /dev/null
echo "Done!"

echo -n "Removing 'node_modules' directory... "
rm -rf ./node_modules
echo "Done!"

echo -n "Running 'npm install'... "
npm install &> /dev/null
echo "Done!"

echo -n "Creting development configuration file... "
node ./scripts/create-config > ./server/config/config.development.json
echo "Done!"

echo "All done! You can now run 'npm start' to start the chat."
exit 0
