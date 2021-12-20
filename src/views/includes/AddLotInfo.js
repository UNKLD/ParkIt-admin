import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './includes.css';
import Navbar from '../admin/Navbar';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function AddLotInfo() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [slots, setSlots] = useState('');
  const [tariff, setTariff] = useState('');
  const [adInfo, setAdInfo] = useState('');

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

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/');
    getTariff();
  }, [ReactSession.get('adminEmail')]);

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== '' && slots !== '' && adInfo !== '') {
      const lotListRef = ref(db, '/parkingLot');
      const newLotRef = push(lotListRef);
      // console.log(newLotRef)
      set(newLotRef, {
        id: newLotRef.key,
        name: name,
        totalSlots: slots,
        availableSlots: slots,
        occpupiedSlots: 0,
        tariff: tariff,
        aditionalInfo: adInfo,
      });

      alert('Information successfuly added');
      history.replace('/dashboard');
    } else {
      alert('Please Enter all data');
    }
  }

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <ul className="collection with-header users">
        <li className="collection-header">
          <h4>Add Parking lot Information</h4>
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
                type="text"
                className="validate"
              />
            </div>
            <div className="input-field col s6">
              <input
                onChange={(e) => setSlots(e.target.value)}
                placeholder="Parking lot total number of slots"
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
export default AddLotInfo;
