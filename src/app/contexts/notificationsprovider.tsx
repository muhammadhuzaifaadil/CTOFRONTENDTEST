"use client";

import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
import { toast } from "sonner";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyB6QNlcUWzaVkrA2IKB8hPl5KqRC-R-MbI",
  authDomain: "ctoasservice-265b4.firebaseapp.com",
  projectId: "ctoasservice-265b4",
  storageBucket: "ctoasservice-265b4.firebasestorage.app",
  messagingSenderId: "928213608236",
  appId: "1:928213608236:web:3d6a899b0ed7da1bbfae89",
  measurementId: "G-F2P34SPDE6"
};

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
} catch (e) {
  console.log("Firebase init skipped (already initialized)");
}

export default function FirebaseNotificationProvider() {
  useEffect(() => {
    const messaging = firebase.messaging();

    messaging.onMessage((payload) => {
      console.log("🔥 Foreground notification:", payload);

      toast(payload.notification.title, {
        description: payload.notification.body,
        duration: 6000,
      });
    });
  }, []);

  return null;
}
