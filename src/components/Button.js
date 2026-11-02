import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { TYPE, shadow } from '../theme/typography';

// Figma: Component set "Button" -> Variant Primary / Outline (+ Danger, latihan 1).
// variant : 'primary' | 'outline' | 'danger'
// icon    : nama Ionicons opsional di kiri label, mis. "heart-outline"
export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
  style,
}) {
  const outline = variant === 'outline';
  const tint = outline ? COLORS.primary : COLORS.card;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        styles[variant] ?? styles.primary,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <View style={styles.content}>
        {icon ? <Ionicons name={icon} size={18} color={tint} /> : null}
        <Text style={[styles.label, { color: tint }]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48, // H 48 (Fixed) = area sentuh min. 48 dp
    paddingHorizontal: 24, // Auto layout padding kiri-kanan 24
    borderRadius: 12, // Corner radius 12
    alignItems: 'center', // Alignment tengah
    justifyContent: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  primary: { backgroundColor: COLORS.primary, ...shadow(COLORS.primary) },
  outline: {
    backgroundColor: COLORS.card, // Fill #FFFFFF
    borderWidth: 1.5, // Stroke 1.5
    borderColor: COLORS.primary,
  },
  danger: { backgroundColor: COLORS.danger, ...shadow(COLORS.danger) },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  label: TYPE.button, // Montserrat Semi Bold 15
});
