importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB6QNlcUWzaVkrA2IKB8hPl5KqRC-R-MbI",
  authDomain: "ctoasservice-265b4.firebaseapp.com",
  projectId: "ctoasservice-265b4",
  storageBucket: "ctoasservice-265b4.firebasestorage.app",
  messagingSenderId: "928213608236",
  appId: "1:928213608236:web:3d6a899b0ed7da1bbfae89",
  measurementId: "G-F2P34SPDE6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}


);


