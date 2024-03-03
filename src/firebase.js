// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmMiBuD2g8Gm1qvVRVm4KdIBkVggQD7Vc",
  authDomain: "photogallery-449c5.firebaseapp.com",
  projectId: "photogallery-449c5",
  storageBucket: "photogallery-449c5.appspot.com",
  messagingSenderId: "351192788618",
  appId: "1:351192788618:web:bd04da8397e49dd911c773",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
