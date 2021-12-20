import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import '../includes/includes.css';
import { auth } from '../../firebase';
import Navbar from './Navbar';
import { getDatabase, ref, update, onValue } from 'firebase/database';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();

function UpdateAdmin() {
  let location = useLocation();
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const [name, setName] = useState('');
  const [lotId, setlotId] = useState('');
  const [slots, setSlots] = useState('');
  const [near_address, setNear_address] = useState('');
  const [adminInfo, setAdminInfo] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (
      name !== '' &&
      slots !== '' &&
      near_address !== '' &&
      adminInfo !== ''
    ) {
      update(ref(db, '/parkingLots/' + lotId), {
        name: name,
        totalSlots: slots,
        nearby: near_address,
        admin: adminInfo,
      });
      alert('Information successfuly updated');
      history.replace('/');
    } else {
      alert('Please Enter all data');
    }
  }

  function getParkingLot() {
    const name = location.userProps.name;
    var users = ref(db, '/parkingLots/');
    onValue(
      users,
      (snapshot) => {
        snapshot.forEach((snap) => {
          const lotInfo = snap.val();
          //console.log(userObject);
          if (lotInfo['name'] == name) {
            setName(lotInfo['name']);
            setSlots(lotInfo['totalSlots']);
            setAdminInfo(lotInfo['admin']);
            setNear_address(lotInfo['nearby']);
            setlotId(lotInfo['id']);
          }
        });
      },
      { onlyOnce: true }
    );
  }

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/adminlogin');
    getParkingLot();
    return () => {};
  }, [user, loading]);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <ul className="collection with-header users">
        <li class="collection-header">
          <h4>Add Parking lot Information</h4>
        </li>
      </ul>
      <div className="row container2">
        <form className="col s12" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Parking lot Address"
                id="name"
                type="text"
                className="validate"
              />
            </div>
            <div className="input-field col s6">
              <input
                value={slots}
                onChange={(e) => setSlots(e.target.value)}
                placeholder="Parking lot no of slots"
                id="slots"
                type="number"
                min="1"
                className="validate"
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                value={near_address}
                onChange={(e) => setNear_address(e.target.value)}
                placeholder="Near by Parking lot Address"
                id="nearby_address"
                type="text"
                className="validate"
              />
            </div>
            <div className="input-field col s12">
              <textarea
                value={adminInfo}
                onChange={(e) => setAdminInfo(e.target.value)}
                placeholder="Admin Contact Info"
                id="textarea1"
                type="text"
                className="materialize-textarea"
              ></textarea>
            </div>
          </div>
          <button className="btn btn-large" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateAdmin;
