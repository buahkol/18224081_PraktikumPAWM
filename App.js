import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium,
  Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import AppNavigator from './src/navigation/18224081_M05_AppNavigator';
import { COLORS } from './src/theme/colors';

// Modul 5: semua rute diatur di AppNavigator, App.js jadi ringkas.
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
  });
  if (!fontsLoaded) return null; // tunggu font Montserrat

  return (
    <SafeAreaProvider>
      {/* Landscape: edges kiri-kanan agar konten tidak tertutup notch saat HP diputar */}
      <SafeAreaView edges={['left', 'right']} style={{ flex: 1, backgroundColor: COLORS.background }}>
        <AppNavigator />
      </SafeAreaView>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}