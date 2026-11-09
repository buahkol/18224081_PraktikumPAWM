import { View, Text, ScrollView, Alert, StyleSheet, Platform } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import { validateProfil } from '../utils/validators';
import { COLORS } from '../theme/colors';
import { FONTS, TYPE, shadow } from '../theme/typography';

const AWAL = { nama: '', email: '', hp: '', password: '', konfirmasi: '' };

// Inisial nama untuk avatar: "Budi Santoso" -> "BS"
const inisial = (nama) =>
  nama.trim().split(/\s+/).slice(0, 2).map((k) => k[0]?.toUpperCase() ?? '').join('') || '?';

export default function ProfilScreen({ navigation }) {
  const { values, errors, handleChange, handleSubmit, reset, adaYangKosong } =
    useForm(AWAL, validateProfil);

  const simpan = (data) => {
    const pesan = `Profil ${data.nama} tersimpan!`;
    // Alert.alert tidak tampil di web, jadi pakai window.alert saat dicoba di browser
    if (Platform.OS === 'web') window.alert(pesan);
    else Alert.alert('Berhasil', pesan);
    reset();
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Profil" subtitle="Lengkapi data akunmu" />
      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        {/* Kartu avatar seperti frame Profil di Figma, ikut berubah saat mengetik */}
        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{inisial(values.nama)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>{values.nama || 'Nama kamu'}</Text>
            <Text style={styles.mail} numberOfLines={1}>{values.email || 'email@contoh.com'}</Text>
          </View>
        </View>

        <CustomInput label="Nama Lengkap" placeholder="Budi Santoso" value={values.nama}
          onChangeText={handleChange('nama')} error={errors.nama} helper="Sesuai KTM" />
        <CustomInput label="Email" placeholder="budi@itb.ac.id" value={values.email}
          keyboardType="email-address" autoCapitalize="none"
          onChangeText={handleChange('email')} error={errors.email} />
        <CustomInput label="No. HP" placeholder="081234567890" value={values.hp}
          keyboardType="phone-pad"
          onChangeText={handleChange('hp')} error={errors.hp} helper="Diawali 08, total 10–13 digit" />
        <CustomInput label="Password" value={values.password} secureTextEntry
          onChangeText={handleChange('password')} error={errors.password} helper="Minimal 8 karakter" />
        {/* Latihan 1: konfirmasi password */}
        <CustomInput label="Ulangi Password" value={values.konfirmasi} secureTextEntry
          onChangeText={handleChange('konfirmasi')} error={errors.konfirmasi} />

        {/* Latihan 3: nonaktif selama masih ada field kosong */}
        <Button title="Simpan Profil" disabled={adaYangKosong} onPress={handleSubmit(simpan)} />
        <View style={{ height: 12 }} />
        <Button title="Tentang Aplikasi" variant="outline" icon="information-circle-outline"
          onPress={() => navigation.navigate('Tentang')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  form: { padding: 16, paddingTop: 0, paddingBottom: 32 },
  avatarCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: COLORS.card,
    borderRadius: 16, padding: 16, marginBottom: 16, ...shadow(COLORS.primary) },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primarySoft,
    alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: FONTS.semibold, fontSize: 15, color: COLORS.primary },
  name: { fontFamily: FONTS.semibold, fontSize: 15, lineHeight: 21, color: COLORS.text },
  mail: { ...TYPE.caption, color: COLORS.muted },
});