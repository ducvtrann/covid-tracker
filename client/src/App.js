import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Nav } from './components/Nav';

import './App.css';

async function getCovidData(setCovid) {
  try {
    const { data } = await axios.get('/api/us');
    setCovid(data);
  } catch (error) {}
}

export const App = () => {
  const [covid, setCovid] = useState({});
  console.log(covid);
  useEffect(() => {
    getCovidData(setCovid);
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Nav options={Object.keys(covid)} />
        </div>
      </div>
    </div>
  );
};
