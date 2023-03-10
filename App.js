import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import HomePage from './pages/home-page/HomePage';

// Import NavigationContainer ที่ต้องครอบ App ทั้งหมดของเรา
import { NavigationContainer } from '@react-navigation/native';
// Import function เพื่อสร้าง Navigation แบบ Stack อันใหม่มาใช้งาน
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// สร้าง Stack component
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      {/* ครอบ Navigation Container เพื่อสร้างระบบ Navigation */}
      <NavigationContainer>

        {/* สร้าง Stack Navigator โดยใช้ JSX */}
        <Stack.Navigator>

          {/* กำหนด Screen พร้อมทั้ง name และ component ที่ต้องการ */}
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
