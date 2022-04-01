import { USER_STATE_CHANGE } from "../constants/index";
// firebase functions 
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export function fetchUser(){
    const auth = getAuth();
    const app = getApp();
    return ((dispatch) => {
        const db = getFirestore(app);
        const docRef = doc(db, "users", auth.currentUser.uid);
        
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                dispatch({type : USER_STATE_CHANGE, currentUser: docSnap.data()})
            } else {
                console.log("No such document!");
            }
        })
    })
}