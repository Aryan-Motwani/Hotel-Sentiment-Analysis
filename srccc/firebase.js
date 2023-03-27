import {initializeApp} from 'firebase';
// import { getFirestore } from '@firebase/firestore';
import firebase from 'firebase';
import "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBE4NG0d8tyOJxWxLW_0ttwsJtMnRw-uxE",
    authDomain: "survey-app-3db7b.firebaseapp.com",
    databaseURL: "https://survey-app-3db7b-default-rtdb.firebaseio.com",
    projectId: "survey-app-3db7b",
    storageBucket: "survey-app-3db7b.appspot.com",
    messagingSenderId: "622711445586",
    appId: "1:622711445586:web:eadb097b3b655341d2e78b"
};

export const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore();
export const storage = firebase.storage()