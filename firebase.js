// Import the functions you need from the SDKs you need
import  * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA84D4TvnbVJGlLLIlxTzWAcmODcHT7tB8",
    authDomain: "traffic-recognition-220d7.firebaseapp.com",
    projectId: "traffic-recognition-220d7",
    storageBucket: "traffic-recognition-220d7.appspot.com",
    messagingSenderId: "663968935453",
    appId: "1:663968935453:web:f1ee9649069cfba2f860f4"
};

// Initialize Firebase
let app ;
if ( firebase.apps.length === 0 ) {
    app = firebase.initializeApp ( firebaseConfig ) ;
} else {
    app = firebase.app( )
}
const auth = firebase.auth()

export {auth};