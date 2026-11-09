import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

// Figma: Component "TabBar" (Style Guide). Versi STATIS untuk Modul 4,
// supaya tampilan sama dengan desain. Belum bisa pindah layar:
// di Modul 5 komponen ini dihapus dari App.js dan diganti Tab Navigator.
const ITEMS = [
  { name: 'Beranda', icon: 'home' },
  { name: 'Favorit', icon: 'heart' },
  { name: 'Profil', icon: 'person' },
];

export default function TabBar({ active = 'Beranda', onPress }) {
  const insets = useSafeAreaInsets(); // jarak aman dari garis navigasi HP

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom - 14, 8) }]}>
      {ITEMS.map((item) => {
        const aktif = item.name === active;
        const warna = aktif ? COLORS.card : COLORS.primarySoft;
        return (
          <Pressable key={item.name} style={styles.item} onPress={() => onPress?.(item.name)}>
            <Ionicons name={aktif ? item.icon : `${item.icon}-outline`} size={24} color={warna} />
            <Text style={[styles.label, { color: warna }, aktif && styles.labelAktif]}>{item.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row', // 3 item menyamping
    backgroundColor: COLORS.primary, // Fill biru
    borderTopLeftRadius: 24, // Corner radius atas 24
    borderTopRightRadius: 24,
    paddingTop: 10,
  },
  item: { flex: 1, alignItems: 'center', gap: 2 }, // tiap item lebar sama
  label: { fontFamily: FONTS.medium, fontSize: 12, lineHeight: 16 },
  labelAktif: { fontFamily: FONTS.semibold },
});
