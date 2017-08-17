const fs = require('fs');
const path = require('path');
const { mergeDeepRight } = require('ramda');

const baseConfigPath = path.resolve(__dirname, 'config.json');
const envConfigPath = path.resolve(__dirname, `config.${process.env.NODE_ENV}.json`);

const baseConfigExists = fs.existsSync(baseConfigPath);

if (!baseConfigExists) {
  throw new Error('Missing configuration file!');
}

let config = JSON.parse(fs.readFileSync(baseConfigPath));

const envConfigExists = fs.existsSync(envConfigPath);

if (envConfigExists) {
  config = mergeDeepRight(config, JSON.parse(fs.readFileSync(envConfigPath)));
}

module.exports = config;
