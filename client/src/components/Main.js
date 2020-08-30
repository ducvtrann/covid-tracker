import React from 'react';
import { Cards } from './Cards';
import { Chart } from './Chart';
import { Rank } from './Rank';

export const Main = ({ covid, activeCovid }) => {
  return (
    <div className="row">
      <div className="col-12">
        <Cards activeCovid={covid[activeCovid]} />
        <Chart />
      </div>
      {/* <div className="col-12 col-md-3">
        <Rank />
      </div> */}
    </div>
  );
};
