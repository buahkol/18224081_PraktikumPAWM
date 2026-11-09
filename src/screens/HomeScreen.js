import { useState } from 'react';
import { View, FlatList, Text, StyleSheet, useWindowDimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomInput from '../components/CustomInput';
import CategoryChips from '../components/CategoryChips';
import PromoBanner from '../components/PromoBanner';
import Card from '../components/Card';
import Chip from '../components/Chip';
import { DUMMY_PRODUCTS, PROMO, diskonProduk, hargaAkhir } from '../data/dummy';
import { COLORS } from '../theme/colors';
import { TYPE } from '../theme/typography';

const URUTAN = ['Termurah', 'Termahal']; // latihan 2: chip pengurutan harga

export default function HomeScreen() {
  const { width } = useWindowDimensions(); // lebar layar (dp), ikut berubah saat HP diputar
  const numColumns = Math.max(2, Math.floor(width / 180)); // 1 kolom per ±180 dp, minimal 2

  const [query, setQuery] = useState('');
  const [kategori, setKategori] = useState('Semua');
  const [urut, setUrut] = useState(null); // null = urutan asli

  const products = DUMMY_PRODUCTS; // Modul 7: diganti data API
  const categories = ['Semua', ...new Set(products.map((p) => p.category))];

  const data = products
    .filter((p) =>
      (kategori === 'Semua' || p.category === kategori) &&
      p.title.toLowerCase().includes(query.toLowerCase()))
    // sort() mengubah array asli, jadi salin dulu (filter sudah membuat array baru)
    .sort((a, b) =>
      // urutkan berdasarkan harga SETELAH diskon (yang dilihat pengguna)
      urut === 'Termurah' ? hargaAkhir(a) - hargaAkhir(b)
        : urut === 'Termahal' ? hargaAkhir(b) - hargaAkhir(a) : 0);

  // Ketuk chip yang sama sekali lagi -> kembali ke urutan asli
  const pilihUrut = (item) => setUrut((prev) => (prev === item ? null : item));

  const header = (
    <>
      <PromoBanner
        title={`Diskon ${PROMO.diskon}%`} // teks banner diambil dari data PROMO
        subtitle={`untuk semua produk ${PROMO.kategori}`}
        image="https://picsum.photos/id/1059/600/200"
        onPress={() => setKategori(PROMO.kategori)}
      />
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Urutkan</Text>
        {URUTAN.map((item) => (
          <Chip key={item} label={item} active={urut === item} onPress={() => pilihUrut(item)} />
        ))}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <HeaderBar title="KatalogKu" subtitle="Halo Budi, mau cari apa hari ini?" />
      <View style={styles.search}>
        <CustomInput icon="search" placeholder="Cari produk..." value={query}
          onChangeText={setQuery} style={{ marginBottom: 12 }} />
      </View>
      <CategoryChips items={categories} selected={kategori} onSelect={setKategori} />
      <FlatList
        key={numColumns} // wajib: paksa render ulang saat jumlah kolom berubah
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={header}
        ListHeaderComponentStyle={styles.listHeader}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Produk tidak ditemukan</Text>}
        renderItem={({ item }) => (
          <View style={{ width: `${100 / numColumns}%` }}>
            <Card title={item.title} price={item.price} image={item.thumbnail}
              discount={diskonProduk(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  search: { paddingHorizontal: 16 },
  listHeader: { marginHorizontal: -10 }, // banner selebar layar (batalkan padding list)
  list: { paddingHorizontal: 10, paddingBottom: 24 },
  sortRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, marginTop: 10, marginBottom: 4 },
  sortLabel: { ...TYPE.caption, color: COLORS.muted, marginRight: 4 },
  empty: { ...TYPE.body, textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});