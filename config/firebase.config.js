import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyD5sAPiTAnikb1kbAgoZOIuuHTRNRe-ZSA",
  authDomain: "app-tomate.firebaseapp.com",
  projectId: "app-tomate",
  storageBucket: "app-tomate.appspot.com",
  messagingSenderId: "69935750669",
  appId: "1:69935750669:web:daa948963ba4856e8b3f44",
};
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
