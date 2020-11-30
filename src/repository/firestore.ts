import firebase from 'firebase/app';
import 'firebase/firestore';

// Get a Firestore instance
export const db = setup();

function setup() {
  if (location.hostname === 'localhost') {
    const _db = firebase
      .initializeApp({
        projectId: 'test',
      })
      .firestore();
    _db.settings({
      host: 'localhost:8081',
      ssl: false,
    });
    return _db;
  } else {
    return firebase
      .initializeApp({
        apiKey: 'AIzaSyCgY5DET3HhstK6MVtciRXAqK_c1aC6vdU',
        authDomain: 'shopaholic-199f6.firebaseapp.com',
        databaseURL: 'https://shopaholic-199f6.firebaseio.com',
        projectId: 'shopaholic-199f6',
        storageBucket: 'shopaholic-199f6.appspot.com',
        messagingSenderId: '148274201687',
        appId: '1:148274201687:web:fb5fd0eb5452b7edeccf12',
      })
      .firestore();
  }
}

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
