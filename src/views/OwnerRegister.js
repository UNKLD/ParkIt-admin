import React, { useEffect, useState } from 'react';
import { registerWithEmailAndPassword } from '../firebase';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import './OwnerDash.css';
import { NavLink } from 'react-router-dom';

const db = getDatabase();
function AddAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    if (!email) alert('Please enter email');
    registerWithEmailAndPassword(email, password);
  };

  return (
    <>
      <div className="container" style={{ width: '100%', marginLeft: '8%' }}>
        <nav className="nav blue">
          <ul>
            <li>
              <NavLink to="/">Owner Login</NavLink>
            </li>
            <li>
              <NavLink to="/adminlogin">Admin Login</NavLink>
            </li>

            <li>
              <NavLink to="/employeelogin">Employee Login</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="register">
        <div className="register__container">
          <h5>Owner Register</h5>
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register__btn" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}
export default AddAdmin;
