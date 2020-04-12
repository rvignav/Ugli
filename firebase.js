const firebaseConfig = {
    apiKey: "AIzaSyBx5TAf1GMd-yYXPaEHt9fy3YSWx1lrB00",
    authDomain: "titanhacks-adf3c.firebaseapp.com",
    databaseURL: "https://titanhacks-adf3c.firebaseio.com",
    projectId: "titanhacks-adf3c",
    storageBucket: "titanhacks-adf3c.appspot.com",
    messagingSenderId: "937261596231",
    appId: "1:937261596231:web:d2160182de162710ee7b62"
};
  const app = firebase.initializeApp(firebaseConfig);
  const db = app.firestore();
  db.settings({timestampsInSnapshots: true});
  const perf = firebase.performance();
  const analytics = firebase.analytics();
  