import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './nav.css';
import { useHistory } from 'react-router';
import ReactSession from 'react-client-session/dist/ReactSession';

function Navbar() {
  const history = useHistory();

  function logout() {
    ReactSession.remove('empEmail');
    history.replace('/');
  }

  useEffect(() => {
    if (!ReactSession.get('empEmail')) history.replace('/');
    return () => {};
  }, [ReactSession.get('empEmail')]);

  return (
    <>
      <div className="brand">
        <NavLink to="/">
          <h3> ParkIt Owner Dashboard </h3>
        </NavLink>
        <nav className="nav blue">
          <ul>
            <NavLink to="/empdashboard" exact>
              <li>Home</li>
            </NavLink>
            <NavLink to="/EmpUsersList" exact>
              <li>All Users</li>
            </NavLink>
            <button className="btn btn-sm red" onClick={logout}>
              Log Out
            </button>
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
