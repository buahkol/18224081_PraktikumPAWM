import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/colors';
import { FONTS, TYPE, shadow } from '../theme/typography';

// Latihan Modul 5 no. 3: layar "Tentang" dibuka dari Profil memakai Stack.
// Ganti NAMA dengan nama lengkapmu.
const NAMA = 'Illona Nasywa Hannum';
const NIM = '18224081';

export default function TentangScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar title="Tentang" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.logo}>
          <Ionicons name="bag-handle-outline" size={44} color={COLORS.card} />
        </View>
        <Text style={styles.app}>KatalogKu</Text>
        <Text style={styles.ver}>Versi 1.0.0</Text>
        <View style={styles.card}>
          <Row label="Nama" value={NAMA} />
          <Row label="NIM" value={NIM} />
          <Row label="Mata kuliah" value="II3140 PAWM" />
        </View>
      </View>
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { alignItems: 'center', padding: 24 },
  logo: { width: 88, height: 88, borderRadius: 24, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center', ...shadow(COLORS.primary) },
  app: { ...TYPE.heading, color: COLORS.primary, marginTop: 16 },
  ver: { ...TYPE.small, color: COLORS.muted },
  card: { alignSelf: 'stretch', backgroundColor: COLORS.card, borderRadius: 16, padding: 16,
    marginTop: 24, gap: 12, ...shadow(COLORS.primary) },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  label: { ...TYPE.small, color: COLORS.muted },
  value: { fontFamily: FONTS.semibold, fontSize: 14, lineHeight: 20, color: COLORS.text, flexShrink: 1, textAlign: 'right' },
});
