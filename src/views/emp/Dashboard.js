import React, { useEffect, useState } from 'react';
import {} from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { getDatabase, ref, onValue } from 'firebase/database';
import Navbar from './Navbar';
import './Dashboard.css';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function EmpDashboard() {
  const [parkingLots, setParkingLots] = useState([]);
  const history = useHistory();

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

  useEffect(() => {
    if (!ReactSession.get('empEmail')) history.replace('/');
    getParkingLots();
    return () => {
      setParkingLots([]);
    };
  }, [ReactSession.get('empEmail')]);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div style={{ marginLeft: '5%', width: '90%' }}>
        <div className="parkingLots_contain">
          <div className="users-container">
            <div>
              <ul className="collection with-header">
                <li className="collection-header">
                  <h4>Parking Lot</h4>
                </li>
                {parkingLots.map((Obj) => {
                  return (
                    <li key={Obj.name}>
                      <ul className="collection-item">
                        <li>
                          <p>Name: {Obj.name}</p>
                        </li>
                        <li>
                          <p>Total Slots: {Obj.totalSlots}</p>
                        </li>
                      </ul>
                      <hr style={{ color: '#eee' }} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EmpDashboard;
