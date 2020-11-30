import firebase from "firebase";

// production version reads from titanhacks2
var firebaseConfig = {
  // apiKey: "AIzaSyBx5TAf1GMd-yYXPaEHt9fy3YSWx1lrB00",
  // authDomain: "titanhacks-adf3c.firebaseapp.com",
  // databaseURL: "https://titanhacks-adf3c.firebaseio.com",
  // projectId: "titanhacks-adf3c",
  // storageBucket: "titanhacks-adf3c.appspot.com",
  // messagingSenderId: "937261596231",
  // appId: "1:937261596231:web:ff7385ede7540601ee7b62",
  apiKey: "AIzaSyBb4aS184alzREy7YQmsT4uytncpQI6ISM",
  authDomain: "titanhacks2.firebaseapp.com",
  databaseURL: "https://titanhacks2.firebaseio.com",
  projectId: "titanhacks2",
  storageBucket: "titanhacks2.appspot.com",
  messagingSenderId: "979559601087",
  appId: "1:979559601087:web:c18f8ff982d8c80010c70a",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
