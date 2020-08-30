import React from 'react';
import { Cards } from './Cards';
import { Chart } from './Chart';

export const Main = ({ covid, activeCovid }) => {
  return (
    <div className="row">
      <div className="col-12">
        <Cards activeCovid={covid[activeCovid]} />
        <Chart activeCovid={covid[activeCovid]} />
      </div>
    </div>
  );
};
