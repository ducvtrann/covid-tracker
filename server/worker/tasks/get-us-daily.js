const axios = require('axios');
const moment = require('moment');
const url = require('url');

let client;
if (process.env.REDIS_URL) {
  const rtg = require('url').parse(process.env.REDIS_URL);
  client = require('redis').createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(':')[1]);
} else {
  client = require('redis').createClient();
}
const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://api.covidtracking.com/v1/us/daily.json';

async function getDailyUS() {
  console.log('Retrieving the past 14 days of US COVID data');

  try {
    const today = moment().format('YYYYMMDD');

    const last14DaysArray = Array.from({ length: 14 }, (_, index) =>
      Number(
        moment(today)
          .subtract(index + 1, 'days')
          .format('YYYYMMDD')
      )
    );

    const response = await axios.get(baseURL);

    if (!response || !Array.isArray(response.data) || !response.data.length) {
      throw new Error('Data was empty in response');
    }

    const { data } = response;
    let usData = { US: [] };

    data.forEach((currentEntry) => {
      if (!last14DaysArray.includes(currentEntry.date)) {
        return;
      }

      usData.US.push(currentEntry);
    });
    await setAsync('us', JSON.stringify(usData));
    console.log('Stored us daily into redis');
  } catch (error) {
    console.log(error);
  }
}

module.exports = getDailyUS;
