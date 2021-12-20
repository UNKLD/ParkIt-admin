import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { set, ref, onValue, push, getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyDxZ-EQgwSuTq1PdN6-dYzDO08XP28sMcA',
  authDomain: 'parkit-eab1c.firebaseapp.com',
  projectId: 'parkit-eab1c',
  storageBucket: 'parkit-eab1c.appspot.com',
  messagingSenderId: '297408529935',
  appId: '1:297408529935:web:0d62b1c47b39708995c57a',
  measurementId: 'G-ND8N8YZ64M',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const ndb = getDatabase();

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const ownerRef = ref(ndb, 'owner/' + res.user.uid);
    set(ownerRef, {
      id: res.user.uid,
      email: res.user.email,
    });
    alert('Owner Account Successfuly Created');
    window.location.href = '/';
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
