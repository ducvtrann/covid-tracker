const axios = require('axios');
const redis = require('redis');
const moment = require('moment');
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
