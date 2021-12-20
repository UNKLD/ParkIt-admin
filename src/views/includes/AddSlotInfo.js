import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import '../admin/Dashboard.css';
import { auth } from '../../firebase';
import Navbar from '../admin/Navbar';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { where } from 'firebase/firestore';

const db = getDatabase();
function UsersList() {
  const [user, loading] = useAuthState(auth);
  const [userEmails, setUserEmails] = useState('');
  const [slot, setSlot] = useState({
    name: '',
    nearBy: '',
    adminInfo: '',
    occpupiedSlots: '',
    availableSlots: '',
    totalSlots: '',
  });
  const [lotid, setLotid] = useState('');

  const history = useHistory();

  const {
    name,
    nearBy,
    adminInfo,
    occpupiedSlots,
    availableSlots,
    totalSlots,
  } = slot;

  function printUsers(e) {
    e.preventDefault();
    var users = ref(db, '/parkingLots/');
    onValue(
      users,
      (snapshot) => {
        snapshot.forEach((snap) => {
          const userObject = snap.val();
          //console.log(userObject);
          console.log(userEmails);
          if (userObject['name'] == userEmails) {
            setLotid(snap.ref.key);
            console.log(userObject);
            setSlot({
              name: userObject['name'],
              nearBy: userObject['nearby'],
              adminInfo: userObject['admin'],
              occpupiedSlots: userObject['occpupiedSlots'],
              availableSlots: userObject['availableSlots'],
              totalSlots: userObject['totalSlots'],
            });
            handleSubmit();
          }
        });
      },
      { onlyOnce: true }
    );
  }

  function handleSubmit() {
    const updates = {};
    set(ref(db, 'parkingLots/'), where(name, '==', true), {
      name: name,
      nearby: nearBy,
      admin: adminInfo,
      totalSlots: 10,
      availableSlots: availableSlots - 1,
      occpupiedSlots: occpupiedSlots + 1,
    });
    console.log(lotid);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace('/');
    //printUsers();
    return () => {
      setUserEmails([{}]);
    };
  }, [user, loading]);
  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <form onSubmit={printUsers} id="form" className="users">
        <input
          onChange={(e) => {
            setUserEmails(e.target.value);
          }}
          type="text"
          name="tariff"
          id="tariff"
          placeholder="Enter Value"
        />
        <button className="btn btn-large" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
export default UsersList;
