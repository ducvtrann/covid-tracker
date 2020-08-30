import React from 'react';
import { calculatePercentage } from '../helpers';

export const Cards = ({ activeCovid }) => {
  const recentData = activeCovid[0];
  const lastData = activeCovid[activeCovid.length - 1];

  return (
    <div className="row justify-content-center mb-3">
      <div className="col-12 col-sm-3">
        <div className="card shadow-sm h-100">
          <div className="card-header">Cases</div>
          <div className="card-body">
            <p>{`Total Cases - ${recentData.positive}`}</p>
            <p>{`New Cases Today - ${recentData.positiveIncrease}`}</p>
            <p>{`Percent Increase (2W) - ${calculatePercentage(
              recentData.positive,
              lastData.positive
            )}`}</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-3">
        <div className="card shadow-sm h-100">
          <div className="card-header">Tests</div>
          <div className="card-body">
            <p>{`Total Tests - ${recentData.totalTestResults}`}</p>
            <p>{`New Tests Today - ${recentData.totalTestResultsIncrease}`}</p>
            <p>{`Percent Increase (2W) - ${calculatePercentage(
              recentData.totalTestResults,
              lastData.totalTestResults
            )}`}</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-3">
        <div className="card shadow-sm h-100">
          <div className="card-header">Hospitalization</div>
          <div className="card-body">
            <p>{`Currently hospitalized - ${recentData.hospitalizedCurrently}`}</p>
            <p>{`Currently in ICU - ${recentData.inIcuCurrently}`}</p>
            <p>{`Currently on ventilator - ${recentData.onVentilatorCurrently}`}</p>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-3">
        <div className="card shadow-sm h-100">
          <div className="card-header">Outcomes</div>
          <div className="card-body">
            <p>{`Recovered - ${recentData.recovered}`}</p>
            <p>{`Death - ${recentData.death}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
