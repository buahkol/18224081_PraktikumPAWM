import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { FONTS, TYPE, shadow } from '../theme/typography';
import Rating from './Rating';

// 250000 -> "Rp250.000" (sesuai harga Rupiah di desain Figma)
export const formatRupiah = (n) =>
  'Rp' + Math.round(Number(n) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Figma: Component "Card" -> props title, price, image (+ discount, rating)
export default function Card({ title, price, image, discount, rating, onPress, style }) {
  const diskon = Number(discount) || 0;
  const harga = diskon ? Math.round((price * (100 - diskon)) / 100) : price; // harga setelah diskon

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}>
      <View>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imageEmpty]}>
            <Ionicons name="image-outline" size={28} color={COLORS.accent} />
          </View>
        )}
        {discount ? (
          // Latihan 3: badge diskon di pojok gambar (position: absolute)
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-{discount}%</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {rating != null ? <Rating value={rating} size={12} /> : null}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatRupiah(harga)}</Text>
          {/* harga lama dicoret jika ada diskon */}
          {diskon ? <Text style={styles.oldPrice}>{formatRupiah(price)}</Text> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, // mengisi lebar kolom grid (Modul 4)
    margin: 6,
    backgroundColor: COLORS.card, // Fill #FFFFFF
    borderRadius: 16, // Corner radius 16
    overflow: 'hidden', // Clip content
    ...shadow(COLORS.primary), // Drop shadow X0 Y4 B12 #2F80ED 10%
  },
  pressed: { opacity: 0.9 },
  image: {
    width: '100%',
    aspectRatio: 152 / 100, // Image 152 × 100 di Figma
    backgroundColor: COLORS.primarySoft, // placeholder #DCEAFD
  },
  imageEmpty: { alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.danger,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { fontFamily: FONTS.semibold, fontSize: 12, lineHeight: 16, color: COLORS.card },
  body: { padding: 12, gap: 4 }, // Auto layout vertikal, padding 12, gap 4
  title: { ...TYPE.small, color: COLORS.text, minHeight: 40 }, // Small 14, 2 baris = 40
  priceRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 6 },
  price: { fontFamily: FONTS.semibold, fontSize: 15, lineHeight: 21, color: COLORS.primary },
  oldPrice: { ...TYPE.caption, fontSize: 12, color: COLORS.muted, textDecorationLine: 'line-through' },
});