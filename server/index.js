const path = require('path');
const express = require('express');
const redis = require('redis');
const cors = require('cors');

// Redis
const { promisify } = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

const app = express();
const PORT = 3001;

app.use(cors());

// api routes
app.use('/us', require('./api'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '../', 'client', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client', 'public/index.html'));
});

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => {
  console.log(`Server is rocking on  port ${PORT}`);
});
