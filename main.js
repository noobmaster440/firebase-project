/**
 * Config File
 */

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

var reviewForm = document.getElementById('reviewForm');
var fullName = document.getElementById('fullName');
var message = document.getElementById('message');
var hiddenId = document.getElementById('hiddenId');

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var id = hiddenId.value || Date.now()

  db.ref('reviews/' + id).set({
    fullName: fullName.value,
    message: message.value
  });

  fullName.value = '';
  message.value = '';
  hiddenId.value = '';
})

var reviewForm = document.getElementById('reviewForm');
var fullName   = document.getElementById('fullName');
var message    = document.getElementById('message');
var hiddenId   = document.getElementById('hiddenId');


// TODO 6, Add listener on firebase event 'child_added'
var reviews = document.getElementById('reviews');
var reviewsRef = db.ref('/reviews');

reviewsRef.on('child_added', (data) => {

  var li = document.createElement('li')
  
  li.id = data.key;
  li.innerHTML = reviewTemplate(data.val())
  reviews.appendChild(li);

  my_form=document.createElement('FORM');
  my_form.id='comment_form';
  // my_form.method='POST';
  // my_form.action='';

  my_tb=document.createElement('INPUT');
  my_tb.type='TEXT';
  my_tb.name='comment';
  my_tb.placeholder='Say something';
  my_tb.id='comment'
  my_form.appendChild(my_tb);

my_tb=document.createElement('Button');
my_tb.type='button';
// my_tb.name='hidden1';
my_tb.id='submit_comment'
my_tb.value='Submit';
my_form.appendChild(my_tb);
reviews.appendChild(my_form);
// my_form.submit();

})

var comment = document.getElementById('comment');
console.log("test 786"+comment)
var comment_form = document.getElementById('comment_form');

comment_form.addEventListener('submit', (e) => {
  e.preventDefault();
  var commentVal = comment.value

  db.ref('comment/' + id).set({
    text: comment.value,
    message: message.value
  });
  comment.value = '';
})


function reviewTemplate({fullName, message}) {
  return `
    <div class='fullName'>${fullName}</div>
    <div class='message'>${message}</div>
  `
}

var reviews = document.getElementById('reviews');



// TODO 9, Add listener on firebase event 'child_changed'.
reviewsRef.on('child_changed', (data) => {
  var reviewNode = document.getElementById(data.key);
  reviewNode.innerHTML = reviewTemplate(data.val());
});


  // TODO 12, Add listener on firebase event 'child_removed'.
  reviewsRef.on('child_removed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.parentNode.removeChild(reviewNode);
  });


/**
 * Update And Delete A Review
 */
reviews.addEventListener('click', (e) => {
  var reviewNode = e.target.parentNode

  
  // TODO 8, Add handler on button Edit
  reviews.addEventListener('click', (e) => {
    var reviewNode = e.target.parentNode
  
    // UPDATE REVEIW
    if (e.target.classList.contains('edit')) {
      fullName.value = reviewNode.querySelector('.fullName').innerText;
      message.value  = reviewNode.querySelector('.message').innerText;
      hiddenId.value = reviewNode.id;
    }
  })


  // TODO 11, Add handler on button Delete
  reviews.addEventListener('click', (e) => {
    var reviewNode = e.target.parentNode

    // UPDATE REVEIW
    //...

    // DELETE REVEIW
    if (e.target.classList.contains('delete')) {
      var id = reviewNode.id;
      db.ref('reviews/' + id).remove();
    }
  })

});


/**
 * Review Template
 */
function reviewTemplate({fullName, message}) {
  return `
    <div class='fullName'>${fullName}</div>
    <div class='message'>${message}</div>
    <button class='edit'>Edit</button>


    <button class='delete'>Delete</button>
  `
};
