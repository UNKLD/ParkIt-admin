import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { auth } from '../firebase';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

import './OwnerDash.css';
import Nav from './Nav';

const db = getDatabase();
function OwnerDashboard() {
  const [user, loading] = useAuthState(auth);
  const [parkingLots, setParkingLots] = useState([]);
  const history = useHistory();

  function getParkingLots() {
    var ParkingLots = ref(db, '/admins/');
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

  function handleRemove(id) {
    remove(ref(db, '/admins/' + id)).then(() => {
      window.location.reload();
    });
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace('/');
    getParkingLots();
    return () => {
      setParkingLots([]);
    };
  }, [user, loading]);

  return (
    <>
      <Nav />
      <div className="parkingLots_contain">
        <div className="users-container">
          <div>
            <ul className="collection with-header">
              <li className="collection-header">
                <h4>All Admin's List</h4>
              </li>
              {parkingLots.map((Obj, key) => {
                return (
                  <li key={key}>
                    <ul className="collection-item">
                      <li>
                        <p>Email: {Obj.email}</p>
                      </li>
                      <button
                        onClick={() => handleRemove(Obj.id)}
                        style={{ marginLeft: '3%' }}
                        className="btn btn-small red"
                      >
                        Remove
                      </button>
                    </ul>
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
export default OwnerDashboard;
