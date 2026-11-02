import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { TYPE } from '../theme/typography';

// Figma: Component set "Chip" -> State Active / Inactive (filter kategori, dipakai Modul 4)
export default function Chip({ label, active = false, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [
        styles.chip,
        active ? styles.active : styles.inactive,
        pressed && { opacity: 0.8 },
      ]}>
      <Text style={[styles.label, { color: active ? COLORS.card : COLORS.primary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 36, // H 36
    paddingHorizontal: 16, // padding 16
    borderRadius: 999, // radius full
    justifyContent: 'center',
  },
  active: { backgroundColor: COLORS.primary },
  inactive: { backgroundColor: COLORS.primarySoft },
  label: TYPE.small, // Small 14
});
