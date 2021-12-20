import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Login.css';
import { NavLink } from 'react-router-dom';
import ReactSession from 'react-client-session/dist/ReactSession';
import { getDatabase, ref, onValue } from 'firebase/database';

const db = getDatabase();
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const [owner, setOwner] = useState(false);
  const history = useHistory();

  function handleLogin() {
    if (email !== '' && password !== '') {
      var ParkingLots = ref(db, 'owner/');
      onValue(
        ParkingLots,
        (snapshot) => {
          snapshot.forEach((snap) => {
            // console.log(snap.val());
            const owner = snap.val();
            // console.log(owner['email']);
            if (email == owner['email']) {
              logInWithEmailAndPassword(email, password);
            } else {
              alert('Wrong credentials');
            }
          });
        },
        { onlyOnce: true }
      );
    } else alert('Enter All data first');
  }

  useEffect(() => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (user) history.replace('/ownerdashboard');
    if (ReactSession.get('adminEmail')) history.replace('/dashboard');
    if (ReactSession.get('empEmail')) history.replace('/empdashboard');
  }, [user, loading]);

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
          <h5>Owner Login</h5>
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
          <button className="login__btn" onClick={handleLogin}>
            Login
          </button>
          <div>
            Don't have an account?
            <NavLink to="/ownerregister">Register</NavLink> now.
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
