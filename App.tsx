import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';

import {firebaseConfig} from './src/utils/firebase.config';
import {initializeApp} from 'firebase/app';
LogBox.ignoreAllLogs();

// se debe inicializar la app de firebase desde el componete ppal de la app
initializeApp(firebaseConfig);
function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>

      <Toast />
    </>
  );
}

export default App;
