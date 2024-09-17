import React, { useEffect } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase/firebaseConfig";

const NotificationHandler = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");

          const token = await getToken(messaging, {
            vapidKey:
              "BL083Lm45MnfFT9nntWNvq-JYVu0A2HHZHFy3v_sk-vZ0qrJ4TgrIv5J1fMHwKxOSQmYpRsFiJRHfFf9O4K2cPw",
          });

          if (token) {
            console.log("FCM Token:", token);
            await fetch(
              "https://backend-shores-n4gu3r6ul-98493255s-projects.vercel.app/store-token",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
              }
            );
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        } else {
          console.log("Notification permission denied.");
        }
      } catch (error) {
        console.error("Error requesting permission or sending token:", error);
      }
    };

    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default NotificationHandler;
