import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Dashboard.css';
import Navbar from './Navbar';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import ReactSession from 'react-client-session/dist/ReactSession';

const db = getDatabase();
function EmployeeList() {
  const [empData, setEmpData] = useState([]);
  const history = useHistory();

  function printEmployees() {
    var users = ref(db, '/employees/');
    onValue(
      users,
      (snapshot) => {
        snapshot.forEach((snap) => {
          const empObject = snap.val();
          console.log(empObject);
          setEmpData((prev) => [...prev, empObject]);
        });
      },
      { onlyOnce: true }
    );
  }

  function handleDelete(id) {
    remove(ref(db, '/employees/' + id)).then(() => {
      window.location.reload();
    });
  }

  useEffect(() => {
    if (!ReactSession.get('adminEmail')) history.replace('/');
    printEmployees();
    return () => {
      setEmpData([{}]);
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
                <h4>All Employees</h4>
              </li>
              {empData.map((emailObj) => {
                return (
                  <ul className="collection-item" key={emailObj.id}>
                    <li>Name: {emailObj.name}</li>
                    <li>Email: {emailObj.email}</li>
                    <li>Phone No: {emailObj.phone}</li>
                    <li>Job Desc: {emailObj.job}</li>
                    <button
                      className="btn btn-small red"
                      onClick={() => handleDelete(emailObj.id)}
                    >
                      Remove
                    </button>
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
export default EmployeeList;
