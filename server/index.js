const path = require('path');
const express = require('express');
// const redis = require('redis');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.REDISTOGO_URL) {
  const rtg = require('url').parse(process.env.REDISTOGO_URL);
  const redis = require('redis').createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(':')[1]);
} else {
  var redis = require('redis').createClient();
}

app.use(cors());

// api routes
app.use('/api', require('./api'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '../', 'client', 'build')));
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
  res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
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
