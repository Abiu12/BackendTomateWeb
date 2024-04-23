// import dotenv from 'dotenv';
// dotenv.config();

// // const firebaseConfig = {
// //     apiKey: process.env.API_KEY,
// //     authDomain: process.env.AUTH_DOMAIN,
// //     projectId: process.env.PROJECT_ID,
// //     databaseURL: process.env.FIRESTORE_DB_URL,
// //     storageBucket: process.env.STORAGE_BUCKET,
// //     messagingSenderId: process.env.MESSAGING_SENDER_ID,
// //     appId: process.env.APP_ID,
// //     measurementId: process.env.MEASUREMENT_ID,
// // };

// const firebaseConfig = {
//     apiKey: "AIzaSyD5sAPiTAnikb1kbAgoZOIuuHTRNRe-ZSA",
//     authDomain: "app-tomate.firebaseapp.com",
//     projectId: "app-tomate",
//     storageBucket: "app-tomate.appspot.com",
//     messagingSenderId: "69935750669",
//     appId: "1:69935750669:web:daa948963ba4856e8b3f44"
//   };
// export default { firebaseConfig };



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5sAPiTAnikb1kbAgoZOIuuHTRNRe-ZSA",
    authDomain: "app-tomate.firebaseapp.com",
    projectId: "app-tomate",
    storageBucket: "app-tomate.appspot.com",
    messagingSenderId: "69935750669",
    appId: "1:69935750669:web:daa948963ba4856e8b3f44"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
// const analytics = getAnalytics(app);