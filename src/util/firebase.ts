import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCvysnLWIP06ncOO0yWAFf4d9wNBNaVNUc",
  authDomain: "rockets-site.firebaseapp.com",
  databaseURL: "https://rockets-site-default-rtdb.firebaseio.com",
  projectId: "rockets-site",
  storageBucket: "rockets-site.appspot.com",
  messagingSenderId: "806028237529",
  appId: "1:806028237529:web:d1feb6b0278bfd591bfcc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app)

const commentsRef = ref(database, "comments")

export default commentsRef;