import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyBEeoHsxw6BJjs8GWATC138qGsL9hG9yFE',
  authDomain: 'grow-app-7dd1d.firebaseapp.com',
  databaseURL: 'https://grow-app-7dd1d.firebaseio.com',
  projectId: 'grow-app-7dd1d',
  storageBucket: 'grow-app-7dd1d.appspot.com',
  messagingSenderId: '321152383674',
  appId: '1:321152383674:ios:5b4f5878381dfbf83ba083',
  measurementId: 'G-F2LBX31CE5'
};
let app = Firebase.initializeApp(config);
export const db = app.database();
