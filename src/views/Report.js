import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './OwnerDash.css';
import Nav from './Nav';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Navbar from './admin/Navbar';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function Report() {
  const [userEmails, setUserEmails] = useState([]);
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  function printUsers() {
    var users = ref(db, '/report/');
    onValue(
      users,
      (snapshot) => {
        snapshot.forEach((snap) => {
          const userObject = snap.val();
          // console.log(userObject);
          setUserEmails((prev) => [...prev, userObject]);
        });
      },
      { onlyOnce: true }
    );
  }

  useEffect(() => {
    if (loading) return <div>Loading...</div>;
    if (!user && !ReactSession.get('adminEmail')) return history.replace('/');
    printUsers();
    return () => {
      setUserEmails([{}]);
    };
  }, [user, loading, ReactSession.get('adminEmail')]);

  return (
    <>
      <div className="nav">{user ? <Nav /> : <Navbar />}</div>

      <div className="users">
        <div className="users-container">
          <div>
            <ul className="collection with-header">
              <li className="collection-header">
                <h4>Report</h4>
              </li>
              {userEmails.map((emailObj, key) => {
                return (
                  <ul className="collection-item" key={key}>
                    <li>Report: {emailObj.report}</li>
                    <li>User Email: {emailObj.userEmail}</li>
                    <li>Time: {emailObj.time}</li>
                    <hr />
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
export default Report;
