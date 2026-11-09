import { ScrollView, StyleSheet } from 'react-native';
import Chip from './Chip';

// Deretan chip filter yang bisa digeser ke samping.
// Memakai komponen Chip dari Modul 3 (Figma: Component set "Chip").
// items    : array string kategori
// selected : item yang sedang aktif
// onSelect : dipanggil dengan item yang diketuk
export default function CategoryChips({ items, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}>
      {items.map((item) => (
        <Chip
          key={item} // key unik agar tidak ada warning
          label={item}
          active={item === selected}
          onPress={() => onSelect(item)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 }, // jangan ambil sisa tinggi layar
  row: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 }, // Chips: gap 8
});
