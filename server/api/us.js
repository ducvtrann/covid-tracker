const router = require('express').Router();
var url = require('url');
var redis = require('redis');

if (process.env.NODE_ENV === 'production') {
  var redisURL = url.parse(process.env.REDISCLOUD_URL);
  var client = redis.createClient(redisURL.port, redisURL.hostname, {
    no_ready_check: true,
  });
  client.auth(redisURL.auth.split(':')[1]);
} else {
  var client = redis.createClient();
}

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

// GET US data
router.get('/', async (req, res, next) => {
  try {
    const usDataString = await getAsync('us');
    const usData = JSON.parse(usDataString);

    const statesDataString = await getAsync('states');
    const statesData = JSON.parse(statesDataString);

    const aggregateUSData = { ...usData, ...statesData };
    res.json(aggregateUSData);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
