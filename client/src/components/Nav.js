import React from 'react';

export const Nav = ({ options }) => {
  console.log(options);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">COVID-19 Tracker</a>
        <form className="d-flex">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
            >
              Action
            </button>
            <ul className="dropdown-menu">
              {options.map((option, idx) => (
                <li key={idx}>
                  <a className="dropdown-item" href="#">
                    {option}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </nav>
  );
};
