import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Dashboard.css';
import Navbar from './Navbar';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function NearByList() {
  const [nearLots, setNearLots] = useState([]);
  const history = useHistory();

  function printLots() {
    var lots = ref(db, '/nearByLots');
    onValue(
      lots,
      (snapshot) => {
        snapshot.forEach((snap) => {
          const lotObject = snap.val();
          // console.log(userObject);
          setNearLots((prev) => [...prev, lotObject]);
        });
      },
      { onlyOnce: true }
    );
  }

  function handleDelete(id) {
    remove(ref(db, '/nearByLots/' + id)).then(() => {
      window.location.reload();
    });
  }

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/dashboard');
    printLots();
    return () => {
      setNearLots([{}]);
    };
  }, [ReactSession.get('adminEmail')]);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>

      <div className="users">
        <div className="users-container">
          <div>
            <ul className="collection with-header">
              <li className="collection-header">
                <h4>All Near by Parking Lots</h4>
              </li>
              <li>
                <hr />
                {nearLots.map((Obj, key) => {
                  return (
                    <ul>
                      <li className="collection-item" key={key}>
                        Name: {Obj.name}
                      </li>
                      <li className="collection-item" key={key}>
                        Tariff: {Obj.tariff}
                      </li>
                      <li className="collection-item" key={key}>
                        Address: {Obj.address}
                      </li>
                      <li className="collection-item" key={key}>
                        Total Slots: {Obj.totalSlots}
                      </li>
                      <li className="collection-item" key={key}>
                        Contact: {Obj.aditionalInfo}
                      </li>
                      <button
                        className="btn btn-small red"
                        onClick={() => handleDelete(Obj.id)}
                      >
                        Remove
                      </button>
                      <hr />
                    </ul>
                  );
                })}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default NearByList;
