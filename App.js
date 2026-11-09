import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium,
  Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import HomeScreen from './src/screens/HomeScreen';
// import DetailScreen from './src/screens/DetailScreen';

// App.js sementara (Modul 4). Diganti AppNavigator di Modul 5.
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
  });
  if (!fontsLoaded) return null; // tunggu font Montserrat

  return (
    <SafeAreaProvider>
      <HomeScreen />
      {/* ganti dengan <DetailScreen /> untuk melihat detail */}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}