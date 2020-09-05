const router = require('express').Router();
const { getAsync } = require('../db');
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
