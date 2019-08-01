import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBNHEbtUQ3JVjXU8rywouYtdNUUlYmsiTY",
    authDomain: "timetable-grobo.firebaseapp.com",
    databaseURL: "https://timetable-grobo.firebaseio.com",
    projectId: "timetable-grobo",
    storageBucket: "timetable-grobo.appspot.com",
    messagingSenderId: "130375939788",
    appId: "1:130375939788:web:89447d762343c376"
};
 
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}