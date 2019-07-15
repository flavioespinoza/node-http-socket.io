'use strict';

const config = {
  host: 'localhost',
  port: 3000,
  apiKey: 'key', // auth api key to access http API

  mongoUri: 'mongodb://localhost/dev-db'
};

switch (process.env.NODE_ENV) {
  case 'prod':
    config.mongoUri = 'mongodb://localhost/prod-db';
    break;
  case 'dev':
    config.mongoUri = 'mongodb://localhost/dev-db';
    break;
  case 'test':
    config.mongoUri ='mongodb://localhost/test-db';
    break;
  default:
    config.mongoUri = 'mongodb://localhost/dev-db';
}

module.exports = config;