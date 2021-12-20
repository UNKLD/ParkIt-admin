import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './includes.css';
import Navbar from '../admin/Navbar';
import { getDatabase, ref, set, push } from 'firebase/database';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function AddNearLot() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [slots, setSlots] = useState('');
  const [tariff, setTariff] = useState('');
  const [adInfo, setAdInfo] = useState('');
  const [phone, setphone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/');
  }, [ReactSession.get('adminEmail')]);

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== '' && slots !== '' && adInfo !== '') {
      const lotListRef = ref(db, '/nearByLots/');
      const newLotRef = push(lotListRef);
      // console.log(newLotRef)
      set(newLotRef, {
        id: newLotRef.key,
        name: name,
        address: address,
        totalSlots: slots,
        phone: phone,
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
          <h4>Add Near by Parking lot Information</h4>
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
                placeholder="Total number of slots"
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
                onChange={(e) => setTariff(e.target.value)}
                placeholder="Tariff"
                id="tariff"
                type="text"
                className="validate"
              />
            </div>
            <div className="input-field col s6">
              <input
                onChange={(e) => setphone(e.target.value)}
                placeholder="Phone"
                id="phone"
                type="text"
                className="validate"
              />
            </div>
            <div className="input-field col s12">
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                id="textarea1"
                type="text"
                className="materialize-textarea"
              ></textarea>
            </div>
            <div className="input-field col s12">
              <textarea
                onChange={(e) => setAdInfo(e.target.value)}
                placeholder="Contact"
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
export default AddNearLot;
