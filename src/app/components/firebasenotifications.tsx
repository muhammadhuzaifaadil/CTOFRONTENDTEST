"use client";

import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB6QNlcUWzaVkrA2IKB8hPl5KqRC-R-MbI",
  authDomain: "ctoasservice-265b4.firebaseapp.com",
  projectId: "ctoasservice-265b4",
  storageBucket: "ctoasservice-265b4.firebasestorage.app",
  messagingSenderId: "928213608236",
  appId: "1:928213608236:web:3d6a899b0ed7da1bbfae89",
  measurementId: "G-F2P34SPDE6"
};

// Fix duplicate-app error
try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
} catch (e) {
  console.log("Firebase init skipped (already initialized)");
}

export default function FirebaseNotifications() {
  useEffect(() => {
    const messaging = firebase.messaging();

    Notification.requestPermission().then((permission) => {
      console.log("Notification permission:", permission);
    });

    messaging.onMessage((payload) => {
      console.log("🔥 Foreground notification:", payload);

      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    });
  }, []);

  return null;
}
