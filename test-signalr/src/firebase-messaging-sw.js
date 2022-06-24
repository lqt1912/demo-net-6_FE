// See https://firebase.google.com/docs/cloud-messaging/js/receive#setting_notification_options_in_the_service_worker
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyBlEyM7Ygrctm1C21g8Vb8HIYErP363hf4",
  authDomain: "angular-demo-8117d.firebaseapp.com",
  projectId: "angular-demo-8117d",
  storageBucket: "angular-demo-8117d.appspot.com",
  messagingSenderId: "921198445128",
  appId: "1:921198445128:web:67e8225213d56457d0ce7d"
};

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
