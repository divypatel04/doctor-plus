import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCM-Y85kKfMTLIkgMsiwkTU07K6HUszE3c",
    authDomain: "doctor-plus-14b52.firebaseapp.com",
    projectId: "doctor-plus-14b52",
    storageBucket: "doctor-plus-14b52.appspot.com",
    messagingSenderId: "546063735671",
    appId: "1:546063735671:web:cce1a53bdda1f893d09f72"
};  
const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
export const storage = firebase.storage();

