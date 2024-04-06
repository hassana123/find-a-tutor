// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPT7KdDYcCfNQUXwnNpbGQk8vASVtSvVI",
  authDomain: "find-a-tutor-19b1e.firebaseapp.com",
  projectId: "find-a-tutor-19b1e",
  storageBucket: "find-a-tutor-19b1e.appspot.com",
  messagingSenderId: "1072742354117",
  appId: "1:1072742354117:web:75e1dd000a6864a30af4ac",
  measurementId: "G-ZBKESKJZ47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
 export{auth, db, storage, analytics} 