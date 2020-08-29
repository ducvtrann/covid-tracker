const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://covidtracking.com/api/states/daily';

async function getDailyStates() {
  console.log('Retrieving the past 14 days of COVID data for each state');

  let statesData = {};
  const { data } = await axios.get(baseURL);

  for (let i = 0; i < 784; i++) {
    const currentState = data[i];
    if (statesData[currentState.state]) {
      statesData[currentState.state].push(currentState);
    } else {
      statesData[currentState.state] = [currentState];
    }
  }
  await setAsync('states-daily', JSON.stringify(statesData));
  console.log('Stored us daily into redis');
}

getDailyStates();
// module.exports = getDailyStates;
