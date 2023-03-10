import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import HomePage from './pages/home-page/HomePage';

export default function App() {
  return (
    <NativeBaseProvider>
        {/* แทรก HomePage component */}
        <HomePage/>
      <StatusBar style="auto" />
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
