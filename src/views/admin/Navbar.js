import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';
import { useHistory } from 'react-router';
import ReactSession from 'react-client-session/dist/ReactSession';

function Navbar() {
  const history = useHistory();
  const [string, setString] = useState('Owner');

  function logout() {
    ReactSession.remove('adminEmail');
    history.replace('/');
  }

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/');
  }, [ReactSession.get('adminEmail')]);

  return (
    <>
      <div className="brand">
        <NavLink to="/">
          <h3> ParkIt Owner Dashboard </h3>
        </NavLink>
        <nav className="blue">
          <ul>
            <NavLink to="/dashboard" exact>
              <li>Home</li>
            </NavLink>
            <NavLink to="/usersList" exact>
              <li>All Users</li>
            </NavLink>
            <button className="btn btn-sm red" onClick={logout}>
              Log Out
            </button>
          </ul>

          <ul id="sidenav" className="sidenav sidenav-fixed">
            <div>
              <li>
                <NavLink to="/AddTariff">Add Tariff Value</NavLink>
              </li>
              <li>
                <NavLink to="/addemployee">Add Employee</NavLink>
              </li>
              <li>
                <NavLink to="/employeelist">Show All Employees</NavLink>
              </li>
              <li>
                <NavLink to="/addlotinfo">Add Parking Lot info</NavLink>
              </li>
              <li>
                <NavLink to="/addnearlot">Add Near by Parking Lot info</NavLink>
              </li>
              <li>
                <NavLink to="/nearbylist">
                  Show all Near by Parking Lot info
                </NavLink>
              </li>
              <li>
                <NavLink to="/usersList">Show all users</NavLink>
              </li>
              <li>
                <NavLink to="/showreserve">Show Reservation Records</NavLink>
              </li>
              <li>
                <NavLink to="/feedbacks">Show Feedbacks</NavLink>
              </li>
              <li>
                <NavLink to="/showreport">Show Report</NavLink>
              </li>
            </div>
          </ul>
          <a href="#" data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">MENU</i>
          </a>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
