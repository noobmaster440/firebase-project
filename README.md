# Firebase-crud-example on github pages.

Working example: 

## Steps to implement by your own

### Create your FireBase project
___

1) Run command `firebase login` it will prompt a google login

2) initaite your project run this command from your app's root dierctory `firebase init`

3) when you're ready, deploy your web app with this command `firebase deploy`

4) after deploying you will see your app at [projectName].web.app

5) Done ✅

### Connect Firebase
___

1) Create account at https://firebase.google.com/.

2) Create new project at firebase. ([any_title]).

3) Disable authorization / add github pages domain to list of allowed domains [github_username].github.io.

4) Add firebase script to index.html according to 
[Add Firebase to your web app](https://firebase.google.com/docs/web/setup#register-app "Add Firebase to your web app").

5) Enable Realtime Database on the [Firebase console](https://console.firebase.google.com "Firebase console").



```
// index.html
  <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>

//main.js
  // Initialize Firebase
  var config = {
    apiKey: "[api_key]",
    authDomain: "[any_title].firebaseapp.com",
    databaseURL: "https://[any_title].firebaseio.com",
    storageBucket: "[any_title].appspot.com",
  };

  firebase.initializeApp(config);
  var db = firebase.database();
```

5) Simplest server for development:

```bash
  npm install -g live-server
  live-server
```

### Implement CRUD
___

#### "C" - Сreate

1) Create simple form:

```
  <h4>CREATE/UPDATE review</h4>
  <form id='reviewForm'>
    <input type="hidden" id='hiddenId' />
    <input type="text" id='fullName' />
    <br/>
    <br/>
    <textarea id='message'></textarea>
    <br/>
    <br/>
    <button type='submit'>Add/Update rewiew</button>
  </form>
```

2) Add handlers:

```
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
```

3) Check in console if data was created:

```
curl https://[any_title].firebaseio.com/reviews.json
```

#### "R" - Read

1) Add container to render reviews.

```
  <h4>READ/DELETE reviews</h4>
  <ul id='reviews'></ul>
```

2) Add listener on firebase event 'child_added'.

```
var reviews = document.getElementById('reviews');
var reviewsRef = db.ref('/reviews');

reviewsRef.on('child_added', ({val, key}) => {
  var li = document.createElement('li')
  li.id = key;
  li.innerHTML = reviewTemplate(val())
  reviews.appendChild(li);
})

function reviewTemplate({fullName, message}) {
  return `
    <div class='fullName'>${fullName}</div>
    <div class='message'>${message}</div>
  `
}
```

#### "U" - Update

1) Add button Edit to template.
```
function reviewTemplate({fullName, message}) {
  return `
    <div class='fullName'>${fullName}</div>
    <div class='message'>${message}</div>
    <button class='edit'>Edit</button>
  `
}
```

2) Add handler on button Edit:

```
reviews.addEventListener('click', (e) => {
  var reviewNode = e.target.parentNode

  // UPDATE REVEIW
  if (e.target.classList.contains('edit')) {
    fullName.value = reviewNode.querySelector('.fullName').innerText;
    message.value  = reviewNode.querySelector('.message').innerText;
    hiddenId.value = reviewNode.id;
  }
})
```

3) Add listener on firebase event 'child_changed'.

```
reviewsRef.on('child_changed', (data) => {
  var reviewNode = document.getElementById(data.key);
  reviewNode.innerHTML = reviewTemplate(data.val());
});
```

#### "D" - Delete

1) Add button Delete to template.
```
function reviewTemplate({fullName, message}) {
  return `
    <div class='fullName'>${fullName}</div>
    <div class='message'>${message}</div>
    <button class='edit'>Edit</button>
    <button class='delete'>Delete</button>
  `
}
```

2) Add handler on button Delete:

```
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
```

3) Add listener on firebase event 'child_removed'.

```
  reviewsRef.on('child_removed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.parentNode.removeChild(reviewNode);
  });
```
#   f i r e b a s e - p r o j e c t  
 # firebase-project
