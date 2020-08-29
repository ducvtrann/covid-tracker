const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    res.json('Finally got here');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
