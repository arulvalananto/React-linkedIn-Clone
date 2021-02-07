import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECTID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_APPID,
   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const db = app.firestore();
const auth = app.auth();
const storage = app.storage();
export { db, auth, storage };
