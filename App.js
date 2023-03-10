import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NativeBaseProvider, Box, IconButton, Icon } from "native-base";
import HomePage from './pages/home-page/HomePage';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanPage from './pages/scan-page/ScanPage';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" 
          component={HomePage} 
          options={({ navigation }) => ({ 
            title: 'My home',
            headerRight: () => (
              <IconButton 
                icon={<Icon as={FontAwesome} name="qrcode"/>}
                borderRadius="full"
                onPress={() => navigation.navigate('Scan')}
              />
            ) 
          })} 
          />

          {/* กำหนด Scan Page เป็นอีก 1 Screen พร้อมทั้ง name และ component  */}
          <Stack.Screen name="Scan" component={ScanPage} />

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
