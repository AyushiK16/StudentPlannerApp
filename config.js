import firebase from 'firebase'
require('@firebase/firestore')


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBh8VyYw8jmFrZv3sCig1HiPWmkgGRGNr8",
    authDomain: "student-planner-db-august.firebaseapp.com",
    projectId: "student-planner-db-august",
    storageBucket: "student-planner-db-august.appspot.com",
    messagingSenderId: "188678474318",
    appId: "1:188678474318:web:204199df8122ce5974511f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();


  /*
  <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBh8VyYw8jmFrZv3sCig1HiPWmkgGRGNr8",
    authDomain: "student-planner-db-august.firebaseapp.com",
    projectId: "student-planner-db-august",
    storageBucket: "student-planner-db-august.appspot.com",
    messagingSenderId: "188678474318",
    appId: "1:188678474318:web:204199df8122ce5974511f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
  */
