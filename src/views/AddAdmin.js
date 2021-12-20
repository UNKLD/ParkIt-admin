import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { getDatabase, ref, set, push } from 'firebase/database';
import Nav from './Nav';
import './OwnerDash.css';

const db = getDatabase();
function AddAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const register = () => {
    if (email !== '' && password !== '') {
      const adminListRef = ref(db, 'admins');
      const newAdminRef = push(adminListRef);
      set(newAdminRef, {
        id: newAdminRef.key,
        email: email,
        password: password,
      });
      alert('Admin successfuly added');
      history.replace('/');
    } else {
      alert('Please Enter all data');
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace('/');
  }, [user, loading]);

  return (
    <>
      <Nav />
      <div className="register">
        <div className="register__container">
          <h5>Admin Register</h5>
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
