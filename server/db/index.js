const url = require('url');
const redis = require('redis');
const { promisify } = require('util');

let client;

if (process.env.REDIS_URL) {
  const urlData = url.parse(process.env.REDIS_URL);
  client = redis.createClient(urlData.port, urlData.hostname);

  client.auth(urlData.auth.split(':')[1]);
} else {
  client = redis.createClient();
}

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

module.exports = {
  setAsync,
  getAsync,
};
