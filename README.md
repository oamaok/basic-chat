# basic-chat

Basic authenticated chat with rooms and private messaging.

## Requirements

 - Node.JS v7.8.0 or better
 - NPM
 - PostgreSQL v9.4 or better

## Installation

After cloning the repository create a database with the name `basic_chat` (or something else if you wish to configure the server differently). Using `/server/config/config.json` as a template update your database credentials in `/server/config/config.ENV.json`, where `ENV` matches the value of the current `NODE_ENV` environment variable. Also configure other variables in the config file to your liking.

Next, install [Versioning](https://github.com/depesz/Versioning) on the database you wish to use.

Next, navigate to the main directory of the repository and run the following commands:

```shell
# Install the required Node packages
npm install

# Generate the DB schema
./migrate
```

## Development

Once done with the installation steps, navigate to the main directory and run `npm start`. Dev server will be booted and is accessible at [http://localhost:8080](http://localhost:8080).

## Licence

MIT
