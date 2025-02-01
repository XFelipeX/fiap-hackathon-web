import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

export const db: firebase.firestore.Firestore;
export const auth: firebase.auth.Auth;
export const app: firebase.app.App;
export const storage: firebase.storage.Storage