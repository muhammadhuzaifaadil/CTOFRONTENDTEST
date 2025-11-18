importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDwGJSizAVJ0Ms2TjyJNZFId37YySw0lzk",
  authDomain: "cto-pushnotifications.firebaseapp.com",
  projectId: "cto-pushnotifications",
  storageBucket: "cto-pushnotifications.firebasestorage.app",
  messagingSenderId: "924786648860",
  appId: "1:924786648860:web:68b4c7675a2266011d7cd9",
  measurementId: "G-NHZ9BLBM4V"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
