import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Nav } from './components/Nav';
import { Main } from './components/Main';

import './App.css';

async function getCovidData(setCovid) {
  try {
    const { data } = await axios.get('/api/us');
    setCovid(data);
  } catch (error) {}
}

export const App = () => {
  const [covid, setCovid] = useState({});
  const [activeCovid, setActiveCovid] = useState('us');

  useEffect(() => {
    getCovidData(setCovid);
  }, []);
  return (
    <div className="container bg-soft">
      <div className="row">
        {Object.keys(covid).length && (
          <div className="col">
            <Nav
              options={Object.keys(covid)}
              activeCovid={activeCovid}
              setActiveCovid={setActiveCovid}
            />
            <Main covid={covid} activeCovid={activeCovid} />
          </div>
        )}
      </div>
    </div>
  );
};
