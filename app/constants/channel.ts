import PushNotification from "react-native-push-notification";


PushNotification.createChannel(
  {
    channelId: "default",
    channelName: "My Channel",
    channelDescription: "A channel to categorize your notifications",
    playSound: true,
    soundName: "default",
    vibrate: true,
    date: new Date()
  },
  (created: boolean) => {
    console.log("Channel created", created);
  }
);
export const CreateChannel = async (noti: any) => {

  PushNotification.localNotification({
    channelId: "default",
    autoCancel: true, // ✅ Ensures notification can be dismissed
    vibrate: true, // Set to true if vibration is needed
    vibration: 300,
    visibility: "public",
    ongoing: false, // ✅ MUST be false to allow dismissal
    userInfo: noti?.data,
    title: noti?.data?.title,
    message: noti?.data?.body,
    playSound: true,
    soundName: "default",
    priority: "high", // Ensure high priority
    importance: "high", // Makes it more noticeable
  });
};