import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { CustomHeader } from './app/components/header';
import { SearchBar } from './app/components/SearchFiled';
import { useState } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { StackNavigation } from './app/navigation/stackNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function App() {

  return (
    <SafeAreaProvider >
      <NavigationContainer  >
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
