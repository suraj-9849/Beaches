importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDci-vfJTiCOyCp67rajVI6PGhWdZsFOys',
  authDomain: 'beach-auth-3b809.firebaseapp.com',
  databaseURL: 'https://beach-auth-3b809-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'beach-auth-3b809',
  storageBucket: 'beach-auth-3b809.appspot.com',
  messagingSenderId: '233754366931',
  appId: '1:233754366931:web:124c27629fda71353d9526'
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
