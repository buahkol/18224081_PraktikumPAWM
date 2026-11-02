import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { TYPE } from '../theme/typography';

// Tantangan Modul 3: bintang sesuai nilai rating 0–5 (mendukung setengah bintang).
export default function Rating({ value = 0, size = 14, showValue = true }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const stars = [1, 2, 3, 4, 5].map((i) => {
    if (v >= i) return 'star';
    if (v >= i - 0.5) return 'star-half';
    return 'star-outline';
  });

  return (
    <View style={styles.row} accessibilityLabel={`Rating ${v} dari 5`}>
      {stars.map((name, i) => (
        <Ionicons key={i} name={name} size={size} color={COLORS.star} />
      ))}
      {showValue ? <Text style={styles.value}>{v.toFixed(1)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  value: { ...TYPE.caption, color: COLORS.muted, marginLeft: 4 },
});
