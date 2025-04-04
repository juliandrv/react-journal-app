// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCtZVjxRZiN6DQLRkmPnghahCttXntJ48A',
  authDomain: 'react-courses-bd.firebaseapp.com',
  projectId: 'react-courses-bd',
  storageBucket: 'react-courses-bd.firebasestorage.app',
  messagingSenderId: '568446696886',
  appId: '1:568446696886:web:f05c858dcdc13d35039517',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
