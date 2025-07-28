// import { Alert, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
// import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './app/navigation/stackNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CreateChannel } from './app/constants/channel';
// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

function App() {

  // // ----------------- get FCM Token-------------------//
  // const getDeviceToken = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   if (enabled) {
  //     const fcmToken = await messaging().getToken()
  //     console.log("fcmToken", fcmToken);
  //     await AsyncStorage.setItem("fcmToken", JSON.stringify(fcmToken));
  //   } else {
  //     Alert.alert('Not enabled to get token', 'error');
  //   }
  // };

  // const requestNotificationPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //         {
  //           title: 'Notification Permission',
  //           message: 'App needs access to your notification ',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Alert.alert('Permission granted');
  //       } else {
  //         // Alert.alert('Permission denied');
  //       }
  //     } catch (err: any) {
  //       // Alert.alert('Permission denied');
  //     }
  //   }
  // };

  // const createNotificationListeners = async () => {
  //   await messaging().requestPermission();
  //   await messaging().hasPermission()
  // };

  // useEffect(() => {
  //   requestNotificationPermission();
  //   getDeviceToken();
  // }, []);

  // const initialNotification = async () => {
  //   const message = await messaging().getInitialNotification();
  //   if (message) { CreateChannel(message); }
  // };

  // useEffect(() => {
  //   try {
  //     createNotificationListeners();
  //     messaging().setBackgroundMessageHandler(async remoteMessage => {
  //       CreateChannel(await remoteMessage);
  //     });

  //     const unsubscribe = messaging().onMessage(async notification => {
  //       console.log("notification", notification);
  //       const notificationData = await notification;
  //       CreateChannel(notificationData);
  //     });
  //     initialNotification();

  //     return () => { unsubscribe(); };
  //   } catch (error) {
  //     console.log("🫧 ~ file: App.tsx:102 ~ useEffect ~ error:->", error)
  //   }
  // }, []);

  // PushNotification.configure({
  //   onNotification: async function (notification: any) {
  //     if (notification.userInteraction) {
  //       try {
  //         const currentUrl = await AsyncStorage.getItem("WebViewURL") || "";
  //         debugger
  //       } catch (error) {
  //         console.log("🫧 ~ file: App.tsx:117 ~ error:->", error)
  //       }
  //     }
  //     if (Platform.OS === 'ios') {
  //       notification.finish(PushNotificationIOS?.FetchResult?.NoData);
  //     }
  //   },
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },
  //   popInitialNotification: true,
  //   requestPermissions: true,

  // });

  return (
    <SafeAreaProvider >
      <NavigationContainer  >
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
