import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import Rating from '../components/Rating';
import { formatRupiah } from '../components/Card';
import { DUMMY_PRODUCTS } from '../data/dummy';
import { COLORS } from '../theme/colors';
import { FONTS, TYPE } from '../theme/typography';

export default function DetailScreen() {
  const product = DUMMY_PRODUCTS[0]; // Modul 5: dari route.params
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <HeaderBar title="Detail Produk" onBack={() => {}} />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <View style={styles.categoryPill}>
          <Text style={styles.category}>{product.category}</Text>
        </View>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatRupiah(product.price)}</Text>
        <Rating value={product.rating} size={14} />
        <Text style={styles.descTitle}>Deskripsi</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </ScrollView>
      {/* Tombol menempel di bawah layar seperti frame Detail Produk di Figma */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button title="Tambah ke Favorit" icon="heart-outline" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 24 },
  image: {
    width: '100%', aspectRatio: 1.35, // gambar mengikuti lebar layar
    borderRadius: 16, backgroundColor: COLORS.primarySoft,
  },
  categoryPill: {
    alignSelf: 'flex-start', marginTop: 16, backgroundColor: COLORS.primarySoft,
    borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2,
  },
  category: { ...TYPE.caption, fontSize: 12, color: COLORS.primary, textTransform: 'uppercase' },
  title: { ...TYPE.heading, color: COLORS.text, marginTop: 8 },
  price: { fontFamily: FONTS.bold, fontSize: 24, lineHeight: 32, color: COLORS.primary, marginVertical: 4 },
  descTitle: { fontFamily: FONTS.semibold, fontSize: 15, lineHeight: 21, color: COLORS.text, marginTop: 20 },
  desc: { ...TYPE.small, lineHeight: 22, color: COLORS.muted, marginTop: 6 },
  footer: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: COLORS.background },
});
