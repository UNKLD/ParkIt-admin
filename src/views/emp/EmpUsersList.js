import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Dashboard.css';
import Navbar from './Navbar';
import { getDatabase, ref, onValue } from 'firebase/database';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function EmpUsersList() {
  const [userEmails, setUserEmails] = useState([]);
  const history = useHistory();

  function printUsers() {
    var users = ref(db, '/users/');
    onValue(
      users,
      (snapshot) => {
        snapshot.forEach((snap) => {
          const userObject = snap.val();
          console.log(userObject);
          setUserEmails((prev) => [...prev, userObject]);
        });
      },
      { onlyOnce: true }
    );
  }

  useEffect(() => {
    if (!ReactSession.get('empEmail')) history.replace('/');
    printUsers();
    return () => {
      setUserEmails([{}]);
    };
  }, [ReactSession.get('empEmail')]);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div style={{ marginLeft: '-5%', width: '90%' }}>
        <div className="users">
          <div className="users-container">
            <div>
              <ul className="collection with-header">
                <li className="collection-header">
                  <h4>All Users</h4>
                </li>
                {userEmails.map((emailObj) => {
                  return (
                    <li className="collection-item" key={emailObj.id}>
                      {emailObj.email}
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
export default EmpUsersList;
