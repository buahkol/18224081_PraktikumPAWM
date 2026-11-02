import { useState } from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
// Impor per ketebalan agar hanya 4 file font yang masuk bundle (bukan 18).
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat/400Regular';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat/500Medium';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat/600SemiBold';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat/700Bold';
import { COLORS } from './src/theme/colors';
import { TYPE } from './src/theme/typography';
import HeaderBar from './src/components/HeaderBar';
import Button from './src/components/Button';
import Card from './src/components/Card';
import CustomInput from './src/components/CustomInput';
import Chip from './src/components/Chip';

// App.js sementara (Modul 3): uji semua komponen. Diganti di Modul 4–5.
const FOTO = 'https://picsum.photos/seed/katalogku';
const KATEGORI = ['Semua', 'Fashion', 'Elektronik', 'Makanan'];
const isEmail = (s) => /^\S+@\S+\.\S+$/.test(s);

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('budi@');
  const [cari, setCari] = useState('');
  const [kategori, setKategori] = useState('Semua');
  const [detail, setDetail] = useState(false); // ganti HeaderBar Title <-> Back

  if (!fontsLoaded) return null; // tunggu font Montserrat selesai dimuat

  return (
    <SafeAreaProvider>
      <View style={styles.screen}>
        {detail ? (
          <HeaderBar title="Detail Produk" onBack={() => setDetail(false)} />
        ) : (
          <HeaderBar title="KatalogKu" subtitle="Uji coba komponen · 18224081" />
        )}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.section}>CustomInput</Text>
          <CustomInput
            icon="search"
            placeholder="Cari produk..."
            value={cari}
            onChangeText={setCari}
          />
          <CustomInput
            label="Nama"
            placeholder="Tulis nama..."
            value={nama}
            onChangeText={setNama}
            error={nama === '' ? 'Nama wajib diisi' : null}
          />
          <CustomInput
            label="Email"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            helper="Contoh: nama@email.com"
            error={email && !isEmail(email) ? 'Format email tidak valid' : null}
          />
          <CustomInput label="Password" icon="lock-closed-outline" placeholder="Minimal 6 karakter" secureTextEntry />

          <Text style={styles.section}>Button</Text>
          <Button title="Sapa" icon="hand-left-outline" onPress={() => Alert.alert('Halo', nama || 'tanpa nama')} />
          <View style={styles.gap} />
          <Button title="Reset" variant="outline" onPress={() => setNama('')} />
          <View style={styles.gap} />
          <Button title="Hapus Produk" variant="danger" icon="trash-outline" onPress={() => Alert.alert('Hapus', 'Produk dihapus')} />
          <View style={styles.gap} />
          <Button title="Kirim" disabled />
          <View style={styles.gap} />
          <Button title="Uji HeaderBar Back" variant="outline" icon="arrow-back" onPress={() => setDetail(true)} />

          <Text style={styles.section}>Chip</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {KATEGORI.map((k) => (
              <Chip key={k} label={k} active={kategori === k} onPress={() => setKategori(k)} />
            ))}
          </ScrollView>

          <Text style={styles.section}>Card</Text>
          <View style={styles.row}>
            <Card title="Kemeja Batik Parang" price={250000} image={`${FOTO}1/300/200`} rating={4.5} />
            <Card title="Sepatu Kanvas Putih Klasik" price={189000} image={`${FOTO}2/300/200`} discount={10} rating={4} />
          </View>
          <View style={styles.row}>
            <Card title="Kopi Gayo 250 gr" price={85000} discount={25} />
            <Card title="Tas Ransel" price={320000} rating={3.5} />
          </View>
        </ScrollView>
        <StatusBar style="dark" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 32 },
  section: { ...TYPE.caption, color: COLORS.muted, marginTop: 8, marginBottom: 8, textTransform: 'uppercase' },
  gap: { height: 12 },
  chips: { gap: 8, paddingBottom: 8 },
  row: { flexDirection: 'row', marginHorizontal: -6, marginBottom: 6 },
});
