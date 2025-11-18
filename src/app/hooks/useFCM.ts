"use client";

import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { firebaseApp } from "@/api/firebase";
import apiClient from "@/api/apiClient";

export const initFCM = async (userId: number) => {
  if (!userId) return;

  try {
    console.log("Checking browser support...");
    const supported = await isSupported();
    console.log("isSupported:", supported);

    if (!supported) {
      console.warn("Browser does not support FCM");
      return;
    }

    console.log("Initializing messaging...");
    const messaging = getMessaging(firebaseApp);

    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();
    console.log("Notification permission =", permission);

    if (permission !== "granted") {
      console.warn("Permission denied. Exiting.");
      return;
    }

    console.log("Trying to get FCM token...");
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    console.log("FCM Token received:", token);

    if (!token) {
      console.warn("Token is NULL — usually means service worker OR VAPID key problem.");
      return;
    }

    console.log("Sending token to backend...");
    await apiClient.post('/auth/update-fcm-token', { userId, fcmToken: token });
    console.log("Token sent successfully.");

    console.log("Listening for foreground messages...");
    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
    });

  } catch (err) {
    console.error("🔥 FCM Error occurred:", err);
  }
};
