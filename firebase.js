// firebase.js

// Import Firebase libraries
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRmKgH0BCYKXj-Yxp4dZqBshrxxkQu4QA",
    authDomain: "portfolio-2c317.firebaseapp.com",
    projectId: "portfolio-2c317",
    storageBucket: "portfolio-2c317.appspot.com",
    messagingSenderId: "962330991772",
    appId: "1:962330991772:web:7d1f07ff067865ef94a159"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the db instance to use in other files
export { db, collection, getDocs, query, orderBy };
