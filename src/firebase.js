import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBBDQCQpnOB9QhmSUnq6ZeGHfp_8J6HxhA",
    authDomain: "ploxy-ccf01.firebaseapp.com",
    projectId: "ploxy-ccf01",
    storageBucket: "ploxy-ccf01.appspot.com",
    messagingSenderId: "866234150038",
    appId: "1:866234150038:web:a993f93ffa862464c1e6b7"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;