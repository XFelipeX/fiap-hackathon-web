import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const db: firebase.firestore.Firestore;
export const auth: firebase.auth.Auth;
export const app: firebase.app.App;