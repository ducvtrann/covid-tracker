const router = require('express').Router();
var url = require('url');
const url = require('url');

if (process.env.REDIS_URL) {
  const rtg = require('url').parse(process.env.REDIS_URL);
  const redis = require('redis').createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(':')[1]);
} else {
  const redis = require('redis').createClient();
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
