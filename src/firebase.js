import firebase from "firebase";

const firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECTID,
   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
   appId: process.env.REACT_APP_APPID,
   measurementId: process.env.REACT_APP_MEASUREMENTID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
