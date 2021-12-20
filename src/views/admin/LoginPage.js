import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Login.css';
import { NavLink } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [found, setFound] = useState();
  const history = useHistory();

  function loginAdmin(email, password) {
    var users = ref(db, '/admins/');
    onValue(
      users,
      (snapshot) => {
        snapshot.forEach((snap) => {
          const admin = snap.val();
          //console.log(userObject);
          if (admin['email'] == email) {
            setFound(true);
            if (admin['password'] == password) {
              ReactSession.set('adminEmail', email);
              history.replace('/dashboard');
            } else {
              setFound(true);
              alert('Wrong Credentials');
            }
          }
        });
      },
      { onlyOnce: true }
    );
  }

  useEffect(() => {
    if (ReactSession.get('adminEmail')) history.replace('/dashboard');
    return () => {};
  }, [ReactSession.get('AdminEmail')]);

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
      <div className="login">
        <div className="login__container">
          <h5>Admin Login</h5>
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="login__btn"
            onClick={() => loginAdmin(email, password)}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
export default AdminLogin;
