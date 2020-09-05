const { CronJob } = require('cron');

const getUSDaily = require('./tasks/get-us-daily');
const getStatesDaily = require('./tasks/get-states-daily');

const getUSDailyJob = new CronJob(
  '0 */24 * * *',
  getUSDaily,
  null,
  true,
  'America/Los_Angeles'
);

const getStatesDailyJob = new CronJob(
  '0 */24 * * *',
  getStatesDaily,
  null,
  true,
  'America/Los_Angeles'
);

getUSDailyJob.start();
getStatesDailyJob.start();
