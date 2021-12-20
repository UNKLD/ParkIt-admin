import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';
import Navbar from './Navbar';
import './Dashboard.css';
import { NavLink } from 'react-router-dom';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function Dashboard() {
  const [tariff, setTariff] = useState('');
  const [newTariff, setNewTariff] = useState('');
  const [parkingLots, setParkingLots] = useState([]);
  const history = useHistory();

  function getTariff() {
    var getTariff = ref(db, '/tariff/');
    onValue(
      getTariff,
      (snapshot) => {
        setTariff(snapshot.val()['amount']);
      },
      { onlyOnce: true }
    );
  }

  function updateTariff(e) {
    e.preventDefault();
    if (newTariff !== '') {
      // console.log(tariff);
      set(ref(db, 'tariff/'), {
        amount: newTariff,
      });
      setNewTariff('');
      getTariff();
    } else {
      alert('please enter a value');
    }
  }

  function getParkingLots() {
    var ParkingLots = ref(db, '/parkingLot/');
    onValue(
      ParkingLots,
      (snapshot) => {
        snapshot.forEach((snap) => {
          const object = snap.val();
          // console.log(object);
          setParkingLots((prev) => [...prev, object]);
        });
      },
      { onlyOnce: true }
    );
  }

  function handleDelete(id) {
    remove(ref(db, '/parkingLots/' + id)).then(() => {
      window.location.reload();
    });
  }

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/');
    getTariff();
    getParkingLots();
    return () => {
      setParkingLots([]);
    };
  }, [ReactSession.get('adminEmail')]);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>

      <div className="container">
        <h4>Update Tariff</h4>
        <h5>Current Tariff Value = {tariff}</h5>
        <form onSubmit={updateTariff}>
          <input
            type="number"
            required
            value={newTariff}
            onChange={(e) => {
              setNewTariff(e.target.value);
            }}
            min="1"
          />
          <div style={{ marginTop: '15px' }}>
            <button className="btn btn-sm">Update Tariff</button>
          </div>
        </form>
      </div>

      <div className="vl"></div>

      <div className="parkingLots_container">
        <div className="users-container">
          <div>
            <ul className="collection with-header">
              <li className="collection-header">
                <h4>Parking Lot Info</h4>
              </li>
              {parkingLots.map((Obj, key) => {
                return (
                  <li key={key}>
                    <NavLink
                      to={{
                        pathname: './showparkinglot',
                        userProps: { name: Obj.name },
                      }}
                    >
                      <ul className="collection-item">
                        <li>
                          <p>Name: {Obj.name}</p>
                        </li>
                        <li>
                          <p>Total Slots: {Obj.totalSlots}</p>
                        </li>
                      </ul>
                    </NavLink>
                    <button
                      onClick={() => {
                        handleDelete(Obj.id);
                      }}
                      className="btn btn-small red"
                    >
                      Remove
                    </button>
                    <hr style={{ color: '#eee' }} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
