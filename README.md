## Installation instructions

1. Run mongodb in-memory `mongod --storageEngine mmapv1` and create database
2. Create config for different environments in `index.js` file based on `index-example.js` in [config](https://github.com/paradisensei/node-http-service/tree/master/config) folder
3. Update host property in `swagger.json` file
3. Run `npm install` to install dependencies

## Running instruction

1. Run `npm run dev` or `npm run start` to run http API

## Testing instruction

1. Run `npm run test` to run integration tests
2. Run `npm run dev` and go to `host:port/api-docs` url to check out Swagger UI for http API