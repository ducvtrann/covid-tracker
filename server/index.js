const express = require('express');
const redis = require('redis');
const cors = require('cors');
const { promisify } = require('util');
const { resolveNaptr } = require('dns');

const app = express();
const PORT = 3001;

app.use(cors());
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

app.get('/', (req, res) => {
  res.json('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is rocking on  port ${PORT}`);
});
