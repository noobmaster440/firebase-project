// import { getDatabase, ref, onValue} from "firebase/database";

// var config = {
//     apiKey: "AIzaSyDd4SdoVY_34QNn2tXS3PZqWwP08piVQnY",
//     authDomain: "demodemo-906fb.firebaseapp.com",
//     databaseURL: "https://demodemo-906fb-default-rtdb.firebaseio.com",
//     projectId: "demodemo-906fb",
//     storageBucket: "demodemo-906fb.appspot.com",
//     messagingSenderId: "531149287899",
//     appId: "1:531149287899:web:ea34665cfac8de27a8b7fe"
//   };
  
//   const db = getDatabase();
//   console.log("test446")

  


// // POST GETTING FORM
// const post_title=document.getElementById('post_title')
// const post_body=document.getElementById('post_body')


// // db.ref('reviews/' + id).set({
// //     post_title: fullName.value,
// //     post_body: message.value
// //   });

// const postId=localStorage.getItem('postId')
// const postRef = ref(db,'reviews/' + postId);
// onValue(postRef, (snapshot) => {
//     const data = snapshot.val();
//     console.log("data")
//     post_title.innerHTML=data;
// });
var config = {
    apiKey: "AIzaSyDd4SdoVY_34QNn2tXS3PZqWwP08piVQnY",
    authDomain: "demodemo-906fb.firebaseapp.com",
    databaseURL: "https://demodemo-906fb-default-rtdb.firebaseio.com",
    projectId: "demodemo-906fb",
    storageBucket: "demodemo-906fb.appspot.com",
    messagingSenderId: "531149287899",
    appId: "1:531149287899:web:ea34665cfac8de27a8b7fe"
  };
  firebase.initializeApp(config);
  var db = firebase.database();
  const postId=localStorage.getItem('postId')
  console.log(postId)




// import { getDatabase, ref, child, get } from "firebase/database";

// const postId=localStorage.getItem('postId')
// console.log("postId")

// const dbRef = ref(getDatabase());
// get(child(dbRef, `reviews/${postId}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });