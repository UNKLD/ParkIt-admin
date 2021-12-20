import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Dashboard.css';
import Navbar from './Navbar';
import { getDatabase, ref, onValue } from 'firebase/database';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function ShowReservations() {
  const [empData, setEmpData] = useState([]);
  const [visible, setVisible] = useState(true);
  const history = useHistory();

  function printEmployees() {
    var users = ref(db, '/reservations/');
    onValue(
      users,
      (snapshot) => {
        if (snapshot.val() == null) {
          setVisible(true);
        }
        snapshot.forEach((snap) => {
          const empObject = snap.val();
          setEmpData((prev) => [...prev, empObject]);
        });
      },
      { onlyOnce: true }
    );
  }

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/');
    printEmployees();
    return () => {
      setEmpData([]);
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
                <h4>All Reservation Records</h4>
              </li>
              {empData.map((emailObj, key) => {
                return (
                  <ul className="collection-item" key={key}>
                    <li>User Email: {emailObj.userEmail}</li>
                    <li>Time: {emailObj.time}</li>
                  </ul>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowReservations;
