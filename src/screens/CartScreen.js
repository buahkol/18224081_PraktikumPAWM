import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import { COLORS } from '../theme/colors';
import { TYPE } from '../theme/typography';

// Latihan Modul 5 no. 1: tab keempat "Keranjang" (versi sederhana).
export default function CartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar title="Keranjang" subtitle="0 produk" />
      <View style={styles.empty}>
        <Ionicons name="cart-outline" size={56} color={COLORS.accent} />
        <Text style={styles.title}>Keranjang masih kosong</Text>
        <Text style={styles.sub}>Yuk cari produk favoritmu di Beranda.</Text>
        <Button title="Mulai Belanja" onPress={() => navigation.navigate('Beranda')} style={{ marginTop: 8 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 8 },
  title: { ...TYPE.heading, fontSize: 18, color: COLORS.text },
  sub: { ...TYPE.small, color: COLORS.muted, textAlign: 'center' },
});
