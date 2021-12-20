import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router';
import { auth } from '../../firebase';
import { getDatabase, ref, set, push } from 'firebase/database';
import Navbar from '../admin/Navbar';
import './includes.css';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function AddEmployee() {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [job, setJob] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name);

    if (name !== '' && phone !== '' && email !== '' && job !== '') {
      const employeeListRef = ref(db, 'employees');
      const newEmployeeRef = push(employeeListRef);
      set(newEmployeeRef, {
        id: newEmployeeRef.key,
        name: name,
        phone: phone,
        email: email,
        password: password,
        job: job,
      });

      alert('Employee successfuly added');
      history.replace('/');
    } else {
      alert('Please Enter all data');
    }
  }

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/dashboard');
  }, [ReactSession.get('adminEmail')]);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>

      <div className="container2">
        <h5>Add Employee Form</h5>
        <div className="row">
          <form className="col s12" onSubmit={handleSubmit} id="form">
            <div className="row">
              <div className="input-field col s6">
                <input
                  onChange={(e) => setName(e.target.value)}
                  id="first_name"
                  type="text"
                  className="validate"
                  placeholder="Full Name"
                />
              </div>
              <div className="input-field col s6">
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  type="text"
                  className="validate"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="text"
                  className="validate"
                  placeholder="Email"
                />
              </div>
              <div className="input-field col s6">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  className="validate"
                  placeholder="Password"
                />
              </div>
              <div className="input-field col s12">
                <textarea
                  onChange={(e) => setJob(e.target.value)}
                  placeholder="Enter Job type"
                  id="textarea1"
                  type="text"
                  className="materialize-textarea"
                ></textarea>
              </div>
            </div>

            <button className="btn btn-large">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddEmployee;
