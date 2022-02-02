//src/service/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';//auth사용
import 'firebase/compat/database';//database사용

const firebaseConfig = {
  apiKey: "AIzaSyBDUfWST1bRd80yeJvnN2l9FK_MBSxO7p4",
  authDomain: "testbed-60f41.firebaseapp.com",
  databaseURL: "https://testbed-60f41-default-rtdb.firebaseio.com", //realtimeDB
  projectId: "testbed-60f41",
  storageBucket: "testbed-60f41.appspot.com",
  messagingSenderId: "148567115407",
  appId: "1:148567115407:web:1f3e15d1c43443f5e412fa",
  measurementId: "G-VHR2CS2M59"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);//위와같이 세팅하겠다는 의미.

export const firebaseAuth=firebaseApp.auth(); // firebaseAuth의 이름으로, 
export const firebaseDB=firebaseApp.database(); // firebaseDB의 이름으로 js파일에서 불러서 사용하면 됨.