import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritScreen from '../screens/FavoritScreen';
import CartScreen from '../screens/CartScreen';
import ProfilScreen from '../screens/ProfilScreen';
import TentangScreen from '../screens/TentangScreen';
import { useFavorit } from '../context/FavoritContext';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

const Stack = createNativeStackNavigator();
// Latar navigator = COLORS.background, sehingga sudut tab bar yang membulat menyatu dengan layar
const THEME = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: COLORS.background } };
const Tab = createBottomTabNavigator();

// Peta nama tab -> ikon Ionicons (aktif / tidak aktif)
const ICONS = {
  Beranda: ['home', 'home-outline'],
  Favorit: ['heart', 'heart-outline'],
  Keranjang: ['cart', 'cart-outline'], // latihan 1: tab keempat
  Profil: ['person', 'person-outline'],
};

// Tab bawah: Beranda | Favorit | Keranjang | Profil
// Gaya mengikuti komponen TabBar di Figma: biru, sudut atas membulat, ikon putih.
function TabNavigator() {
  // insets.bottom = area garis "home" di iPhone (±34 dp). Dikurangi 14 agar tab bar
  // tidak terlalu tinggi, minimal 8 untuk HP tanpa garis home.
  const insets = useSafeAreaInsets();
  const bawah = Math.max(insets.bottom - 14, 8);
  const { favorit } = useFavorit(); // untuk badge jumlah favorit
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // pakai HeaderBar sendiri
        tabBarActiveTintColor: COLORS.card,
        tabBarInactiveTintColor: COLORS.primarySoft,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          // Tinggi = 58 (ikon + label) + jarak bawah. Ubah 58 / 14 / 8 untuk mengatur tinggi.
          height: 58 + bawah,
          paddingTop: 6,
          paddingBottom: bawah,
        },
        tabBarLabelStyle: { fontFamily: FONTS.medium, fontSize: 12 },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
        ),
      })}>
      <Tab.Screen name="Beranda" component={HomeScreen} />
      <Tab.Screen name="Favorit" component={FavoritScreen}
        // Modul 6 latihan 2: angka di ikon Favorit (undefined = badge disembunyikan)
        options={{
          tabBarBadge: favorit.length || undefined,
          tabBarBadgeStyle: { backgroundColor: COLORS.danger, color: COLORS.card, fontFamily: FONTS.semibold, fontSize: 11 },
        }} />
      <Tab.Screen name="Keranjang" component={CartScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

// Stack utama: Main (tab) -> Detail & Tentang (menutupi tab bar)
export default function AppNavigator() {
  return (
    <NavigationContainer theme={THEME}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Tentang" component={TentangScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}