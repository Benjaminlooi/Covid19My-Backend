const admin = require("firebase-admin");

var serviceAccount = require("../covid-19-my-api-firebase-firebase-adminsdk-dztgp-23478118b4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://covid-19-my-api-firebase.firebaseio.com"
});

let db = admin.firestore();