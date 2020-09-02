const { CronJob } = require('cron');

const getUSDaily = require('./tasks/get-us-daily');
const getStatesDaily = require('./tasks/get-states-daily');

//Start the job immediately
getUSDaily();
getStatesDaily();

const getUSDailyJob = new CronJob(
  '* * * * *',
  getUSDaily,
  null,
  true,
  'America/Los_Angeles'
);

const getStatesDailyJob = new CronJob(
  '* * * * *',
  getStatesDaily,
  null,
  true,
  'America/Los_Angeles'
);

getUSDailyJob.start();
getStatesDailyJob.start();
