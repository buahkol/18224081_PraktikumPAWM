import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium,
  Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import HomeScreen from './src/screens/HomeScreen';
// import DetailScreen from './src/screens/DetailScreen';
import TabBar from './src/components/TabBar';
import { COLORS } from './src/theme/colors';

// App.js sementara (Modul 4). Diganti AppNavigator di Modul 5.
export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
  });
  if (!fontsLoaded) return null; // tunggu font Montserrat

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <HomeScreen />
        {/* ganti dengan <DetailScreen /> untuk melihat detail (Detail di Figma tanpa TabBar) */}
        {/* TabBar statis sesuai Figma; di Modul 5 diganti Tab Navigator */}
        <TabBar active="Beranda" />
      </View>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}