const admin = require("firebase-admin");

let serviceAccount = require("./bensanitymain-firebase-adminsdk-zef52-0ef72eb9c3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bensanitymain.firebaseio.com"
});

exports.db = admin.firestore();