import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium,
  Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import AppNavigator from './src/navigation/18224081_M05_AppNavigator';
import { COLORS } from './src/theme/colors';
import { FavoritProvider } from './src/context/FavoritContext';

// Modul 6: FavoritProvider membungkus AppNavigator agar SEMUA layar bisa membaca favorit.
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
  });
  if (!fontsLoaded) return null; // tunggu font Montserrat

  return (
    <SafeAreaProvider>
      <FavoritProvider>
        {/* Landscape: edges kiri-kanan agar konten tidak tertutup notch saat HP diputar */}
        <SafeAreaView edges={['left', 'right']} style={{ flex: 1, backgroundColor: COLORS.background }}>
          <AppNavigator />
        </SafeAreaView>
        {/* header KatalogKu berlatar terang, jadi teks status bar gelap */}
        <StatusBar style="dark" />
      </FavoritProvider>
    </SafeAreaProvider>
  );
}