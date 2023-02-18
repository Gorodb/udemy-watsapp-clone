import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {child, getDatabase, ref} from "firebase/database";

export const getFirebaseApp = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB0S_N3JOwVWFOblN_aMpIzDzrJ_J8RiLI",
    authDomain: "whatsapp-clone-35794.firebaseapp.com",
    projectId: "whatsapp-clone-35794",
    storageBucket: "whatsapp-clone-35794.appspot.com",
    messagingSenderId: "351986889062",
    appId: "1:351986889062:web:4bcdbf7372efdd4d7698a7",
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
}

export const app = getFirebaseApp();
export const auth = getAuth(app);

export const dbRef = ref(getDatabase(app, "https://whatsapp-clone-35794-default-rtdb.europe-west1.firebasedatabase.app/"));

export const userRef = (uid) => child(dbRef, `users/${uid}`)
