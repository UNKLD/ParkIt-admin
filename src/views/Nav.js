import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../firebase';

function Nav() {
  return (
    <div className="nav">
      <div className="brand">
        <NavLink to="/">
          <h3> ParkIt Owner Dashboard </h3>
        </NavLink>
        <nav className="blue">
          <ul>
            <NavLink to="/ownerdashboard" exact>
              <li>Home</li>
            </NavLink>
            <NavLink to="/addadmin">
              <li>Add Admin</li>
            </NavLink>

            <NavLink to="/showreport">
              <li>Show Report</li>
            </NavLink>
            <button className="btn btn-sm red" onClick={logout}>
              Log Out
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
