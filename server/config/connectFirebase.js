const firebaseAdmin = require('firebase-admin');
const config = require('./config');

/* 
    connecting with firebase
*/

const serviceAccountKey = config.fbServiceKeys;
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

module.exports = firebaseAdmin;
