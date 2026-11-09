import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderBar from '../components/HeaderBar';
import Button from '../components/Button';
import Rating from '../components/Rating';
import { formatRupiah } from '../components/Card';
import { DUMMY_PRODUCTS, diskonProduk, hargaAkhir } from '../data/dummy';
import { useFavorit } from '../context/FavoritContext';
import { COLORS } from '../theme/colors';
import { FONTS, TYPE } from '../theme/typography';

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params; // hanya id yang dikirim dari Beranda
  const product = DUMMY_PRODUCTS.find((p) => p.id === id); // Modul 7: ambil dari API
  const insets = useSafeAreaInsets();
  const { isFavorit, toggleFavorit } = useFavorit();
  const fav = isFavorit(id);

  if (!product) {
    return (
      <View style={styles.container}>
        <HeaderBar title="Detail Produk" onBack={() => navigation.goBack()} />
        <Text style={styles.notFound}>Produk tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Latihan 2: judul dinamis = nama produk */}
      <HeaderBar title={product.title} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <View style={styles.categoryPill}>
          <Text style={styles.category}>{product.category}</Text>
        </View>
        <Text style={styles.title}>{product.title}</Text>
        {/* Harga setelah diskon + harga lama dicoret + badge persen */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatRupiah(hargaAkhir(product))}</Text>
          {diskonProduk(product) ? (
            <>
              <Text style={styles.oldPrice}>{formatRupiah(product.price)}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>-{diskonProduk(product)}%</Text>
              </View>
            </>
          ) : null}
        </View>
        <Rating value={product.rating} size={14} />
        <Text style={styles.descTitle}>Deskripsi</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </ScrollView>
      {/* Tombol menempel di bawah layar seperti frame Detail Produk di Figma */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        {/* Teks, ikon & variant berubah sesuai status favorit */}
        <Button
          title={fav ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
          icon={fav ? 'heart' : 'heart-outline'}
          variant={fav ? 'outline' : 'primary'}
          onPress={() => toggleFavorit(product)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 24 },
  image: {
    width: '100%', aspectRatio: 1.35, // gambar mengikuti lebar layar
    maxHeight: 320, // landscape/tablet: gambar tidak terlalu tinggi
    borderRadius: 16, backgroundColor: COLORS.primarySoft,
  },
  categoryPill: {
    alignSelf: 'flex-start', marginTop: 16, backgroundColor: COLORS.primarySoft,
    borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2,
  },
  category: { ...TYPE.caption, fontSize: 12, color: COLORS.primary, textTransform: 'uppercase' },
  title: { ...TYPE.heading, color: COLORS.text, marginTop: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginVertical: 4 },
  price: { fontFamily: FONTS.bold, fontSize: 24, lineHeight: 32, color: COLORS.primary },
  oldPrice: { ...TYPE.small, color: COLORS.muted, textDecorationLine: 'line-through' },
  badge: { backgroundColor: COLORS.danger, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontFamily: FONTS.semibold, fontSize: 12, lineHeight: 16, color: COLORS.card },
  descTitle: { fontFamily: FONTS.semibold, fontSize: 15, lineHeight: 21, color: COLORS.text, marginTop: 20 },
  desc: { ...TYPE.small, lineHeight: 22, color: COLORS.muted, marginTop: 6 },
  notFound: { ...TYPE.body, color: COLORS.muted, textAlign: 'center', marginTop: 40 },
  footer: { paddingHorizontal: 16, paddingTop: 8, backgroundColor: COLORS.background },
});