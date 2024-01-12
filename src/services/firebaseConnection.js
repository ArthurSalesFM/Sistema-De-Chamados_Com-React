import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDVdNUzBZQdcgvg16mvg1kQwFxlLoUQ0_U",
    authDomain: "tickets-42ab3.firebaseapp.com",
    projectId: "tickets-42ab3",
    storageBucket: "tickets-42ab3.appspot.com",
    messagingSenderId: "704767249687",
    appId: "1:704767249687:web:2617d3b4d71f346288fb52",
    measurementId: "G-QJ85VXBKMC"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  export {auth, db, storage};
