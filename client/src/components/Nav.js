import React from 'react';

export const Nav = ({ options, activeCovid, setActiveCovid }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <h1 className="navbar-brand">COVID-19 Tracker</h1>
        <form className="d-flex">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
            >
              {activeCovid}
            </button>
            <ul className="dropdown-menu">
              {options.map((option, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    console.log(option);
                    setActiveCovid(option);
                  }}
                >
                  <span className="dropdown-item">{option}</span>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </nav>
  );
};
