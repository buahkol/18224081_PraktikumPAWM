import { View, FlatList, Text, StyleSheet, useWindowDimensions } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Card from '../components/Card';
import { useFavorit } from '../context/FavoritContext';
import { diskonProduk } from '../data/dummy';
import { COLORS } from '../theme/colors';
import { TYPE } from '../theme/typography';

export default function FavoritScreen({ navigation }) {
  const { favorit } = useFavorit(); // ambil data dari Context
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 4 : width >= 500 ? 3 : 2;

  return (
    <View style={styles.container}>
      <HeaderBar title="Favorit" subtitle={`${favorit.length} produk tersimpan`} />
      <FlatList
        key={numColumns}
        data={favorit}
        numColumns={numColumns}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              Belum ada produk favorit.{'\n'}Ketuk “Tambah ke Favorit” di Detail Produk untuk menyimpannya di sini.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ width: `${100 / numColumns}%` }}>
            <Card title={item.title} price={item.price} image={item.thumbnail}
              discount={diskonProduk(item)}
              onPress={() => navigation.navigate('Detail', { id: item.id })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { paddingHorizontal: 10, paddingBottom: 24 },
  // kotak putus-putus seperti frame Favorit di Figma
  empty: { margin: 6, padding: 16, borderRadius: 12, borderWidth: 1.5, borderStyle: 'dashed', borderColor: COLORS.border },
  emptyText: { ...TYPE.small, color: COLORS.muted, textAlign: 'center' },
});