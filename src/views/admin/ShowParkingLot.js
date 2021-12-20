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

function ShowParkingLot() {
  let location = useLocation();
  const [tariff, setTariff] = useState(location.userProps.name);
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const [name, setName] = useState('');
  const [lotId, setlotId] = useState('');
  const [slots, setSlots] = useState('');
  const [adInfo, setAdInfo] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (
      update(ref(db, '/parkingLot/' + lotId), {
        name: name,
        totalSlots: slots,
        tariff: tariff,
        aditionalInfo: adInfo,
      })
    ) {
      history.replace('/');
    } else {
      alert('Something went wrong');
    }
  }

  function getParkingLot() {
    const name = location.userProps.name;
    var users = ref(db, '/parkingLot/');
    onValue(
      users,
      (snapshot) => {
        snapshot.forEach((snap) => {
          const lotInfo = snap.val();
          //console.log(userObject);
          if (lotInfo['name'] == name) {
            setName(lotInfo['name']);
            setSlots(lotInfo['totalSlots']);
            setAdInfo(lotInfo['aditionalInfo']);
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
          <h4>Update Parking lot Information</h4>
        </li>
      </ul>
      <div className="row container2">
        <form className="col s12" onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Parking lot Name"
                id="name"
                value={name}
                type="text"
                className="validate"
              />
            </div>
            <div className="input-field col s6">
              <input
                onChange={(e) => setSlots(e.target.value)}
                placeholder="Parking lot total number of slots"
                value={slots}
                id="slots"
                type="number"
                min="1"
                className="validate"
              />
            </div>
          </div>

          {/* <div className="row">
            <div className="input-field col s6">
              <input
                onChange={(e) => setNear_address(e.target.value)}
                placeholder="Near by Parking lot Address"
                id="nearby_address"
                type="text"
                className="validate"
              />
  </div>*/}
          <div className="input-field col s12">
            <textarea
              onChange={(e) => setAdInfo(e.target.value)}
              placeholder="About"
              id="textarea1"
              type="text"
              value={adInfo}
              className="materialize-textarea"
            ></textarea>
          </div>
          {/* </div>  */}
          <button className="btn btn-large" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ShowParkingLot;
