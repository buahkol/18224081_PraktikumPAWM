import { View, Text, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import { COLORS } from '../theme/colors';
import { TYPE } from '../theme/typography';

// Layar sementara (Modul 5). Form profil dilengkapi di Modul 6.
export default function ProfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBar title="Profil" subtitle="Lengkapi data akunmu" />
      <View style={styles.content}>
        <Text style={styles.text}>Form profil segera hadir di Modul 6</Text>
        {/* Latihan 3: buka layar Tentang lewat Stack */}
        <Button title="Tentang Aplikasi" variant="outline" icon="information-circle-outline"
          onPress={() => navigation.navigate('Tentang')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, gap: 16 },
  text: { ...TYPE.body, color: COLORS.text },
});
