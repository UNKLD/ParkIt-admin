import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './includes.css';
import Navbar from '../admin/Navbar';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function AddTariff() {
  const history = useHistory();
  const [tariff, setTariff] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (tariff !== '') {
      console.log(tariff);
      set(ref(db, 'tariff/'), {
        amount: tariff,
      });
      alert('Data successfuly entered');
    } else {
      alert('please enter a value');
    }
  }

  function getTariff() {
    const tariffValue = ref(db, 'tariff/');
    onValue(tariffValue, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data['amount'] > 0) {
          alert('Tariff has already been set please update');
          window.location.href = '/dashboard';
        }
      }
    });
  }

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/dashboard');
    getTariff();
    return () => {};
  }, [ReactSession.get('adminEmail')]);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="users">
        <div className="users-container">
          <div className="tariff">
            <ul className="collection with-header">
              <li class="collection-header">
                <h4>Add Tariff</h4>
              </li>
            </ul>
            <form onSubmit={handleSubmit} id="form">
              <input
                type="text"
                name="tariff"
                onChange={(e) => setTariff(e.target.value)}
                id="tariff"
                placeholder="Enter Value"
              />
              <button className="btn btn-large" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddTariff;
