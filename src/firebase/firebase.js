import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAT7QkX4oy43Br39ciEbx1PuVqfBw3UYGg",
  authDomain: "designhaus-a8946.firebaseapp.com",
  databaseURL: "https://designhaus-a8946.firebaseio.com",
  projectId: "designhaus-a8946",
  storageBucket: "designhaus-a8946.appspot.com",
  messagingSenderId: "453188468801"
};

if (!firebase.apps.length){
  firebase.initializeApp(config);
}

// const fire =
const db = firebase.database();
const auth = firebase.auth();

// export default fire;

export {
  db, auth
};
