import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NativeBaseProvider, Box, IconButton, Icon } from "native-base";
import HomePage from './pages/home-page/HomePage';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanPage from './pages/scan-page/ScanPage';

// เรียกใช้ provider และ store
import { Provider } from 'react-redux';
import store from "./redux/store";

const Stack = createNativeStackNavigator();



export default function App() {
  // ครอบ component ทั้งหมดด้วย Provider ที่มีการใส่ store ลงไปใช้งาน
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home"
              component={HomePage}
              options={({ navigation }) => ({
                title: 'My home',
                headerRight: () => (
                  <IconButton
                    icon={<Icon as={FontAwesome} name="qrcode" />}
                    borderRadius="full"
                    onPress={() => navigation.navigate('Scan')}
                  />
                )
              })}
            />

            <Stack.Screen name="Scan" component={ScanPage} />

          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
