import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { FONTS, TYPE, shadow } from '../theme/typography';

// Latihan Modul 4 no. 1: banner promo di atas grid.
// Gambar sebagai latar, teks ditaruh DI ATAS gambar dengan position: absolute.
export default function PromoBanner({ title, subtitle, image, cta = 'Lihat', onPress }) {
  return (
    <View style={styles.banner}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
        </View>
        <Pressable onPress={onPress} style={({ pressed }) => [styles.cta, pressed && { opacity: 0.8 }]}>
          <Text style={styles.ctaText}>{cta}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 88, // tinggi banner di frame Beranda
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 16, // Corner radius 16
    overflow: 'hidden', // gambar ikut melengkung
    backgroundColor: COLORS.primary, // tampil jika gambar gagal dimuat
    ...shadow(COLORS.primary),
  },
  image: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.35 },
  overlay: {
    position: 'absolute', // teks di atas gambar
    top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  title: { fontFamily: FONTS.bold, fontSize: 20, lineHeight: 26, color: COLORS.card },
  sub: { ...TYPE.caption, color: COLORS.card, marginTop: 2 },
  cta: { backgroundColor: COLORS.card, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 },
  ctaText: { fontFamily: FONTS.semibold, fontSize: 13, lineHeight: 18, color: COLORS.primary },
});
