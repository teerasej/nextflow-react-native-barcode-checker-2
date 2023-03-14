import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NativeBaseProvider, Box, IconButton, Icon, Center } from "native-base";
import HomePage from './pages/home-page/HomePage';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanPage from './pages/scan-page/ScanPage';

import { Provider } from 'react-redux';
import store from "./redux/store";
import { initDB } from './services/db.service';



export default function App() {

  
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        
      </NativeBaseProvider>
    </Provider>
  );
}
