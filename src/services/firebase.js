// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCbKjo416K-mEf3KapTOqJD4Q8H3LbGHPY',
  authDomain: 'fiap-hackaton.firebaseapp.com',
  projectId: 'fiap-hackaton',
  storageBucket: 'fiap-hackaton.firebasestorage.app',
  messagingSenderId: '672490382994',
  appId: '1:672490382994:web:8d83becfaaa6eef1e0e84b',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app, 'devenv');
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
