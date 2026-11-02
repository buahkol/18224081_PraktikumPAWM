import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { TYPE, shadow } from '../theme/typography';

// Figma: Component set "HeaderBar" -> Type Title / Back
// Tanpa onBack -> Type=Title (judul + subjudul rata kiri)
// Dengan onBack -> Type=Back (tombol bulat kiri, judul di tengah)
export default function HeaderBar({ title, subtitle, onBack, right }) {
  const insets = useSafeAreaInsets(); // jarak aman dari notch/status bar

  if (onBack) {
    return (
      <View style={[styles.barBack, { paddingTop: insets.top + 8 }]}>
        <Pressable
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Kembali"
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}>
          <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
        </Pressable>
        <Text style={[styles.title, styles.titleCenter]} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.side}>{right ?? null}</View>
      </View>
    );
  }

  return (
    <View style={[styles.barTitle, { paddingTop: insets.top + 24 }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      </View>
      {right ?? null}
    </View>
  );
}

const styles = StyleSheet.create({
  // Type=Title: auto layout vertikal, padding 24/16/16/16, gap 4
  barTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  // Type=Back: auto layout horizontal, space-between, tinggi 56, padding 16
  barBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20, // lingkaran
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow(COLORS.primary),
  },
  side: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }, // RightSpacer 40
  title: { ...TYPE.heading, color: COLORS.primary }, // Heading 20 Bold
  titleCenter: { flex: 1, textAlign: 'center' },
  sub: { ...TYPE.small, color: COLORS.muted, marginTop: 4 }, // Small 14, gap 4
});
