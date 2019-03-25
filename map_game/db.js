import firebase from 'firebase'
import 'firebase/firestore'
var config = {
  apiKey: "AIzaSyAUWNx18e6S8NJbMI-u5ido7RZEn34lOBM",
  authDomain: "contest-b120a.firebaseapp.com",
  databaseURL: "https://contest-b120a.firebaseio.com",
  projectId: "contest-b120a",
  storageBucket: "contest-b120a.appspot.com",
  messagingSenderId: "324073196677"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings(
  {
  // timestampsInSnapshots: true
}
);

export default db