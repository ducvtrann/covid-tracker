const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://covidtracking.com/api/us/daily';

async function getDailyUS() {
  console.log('Retrieving the past 14 days of US COVID data');

  let pastTwoWeeks = [];
  const { data } = await axios.get(baseURL);
  pastTwoWeeks = [...data.slice(0, 14)];

  await setAsync('us-daily', JSON.stringify(pastTwoWeeks));
  console.log('Stored us daily into redis');
}

module.exports = getDailyUS;
