import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLb4Zqiqr99dRRqTeZ6aKx14az7ijZ90k",
    authDomain: "lab-5-f583e.firebaseapp.com",
    projectId: "lab-5-f583e",
    storageBucket: "lab-5-f583e.appspot.com",
    messagingSenderId: "26591170357",
    appId: "1:26591170357:web:7762777d2179182cf3867c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
