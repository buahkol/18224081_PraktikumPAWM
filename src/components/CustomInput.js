import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { TYPE } from '../theme/typography';

// Figma: Component set "CustomInput" -> State Default / Error
// label  : teks di atas input        helper : teks bantuan abu-abu di bawah
// error  : pesan error (border + teks merah)
// icon   : nama Ionicons di kiri input (latihan 2), mis. "search"
// ...rest: placeholder, value, onChangeText, secureTextEntry, dll.
export default function CustomInput({ label, error, helper, icon, style, secureTextEntry, ...rest }) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  const isPassword = !!secureTextEntry;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.field, focused && styles.fieldFocus, error && styles.fieldError]}>
        {icon ? (
          <Ionicons name={icon} size={20} color={focused ? COLORS.primary : COLORS.muted} />
        ) : null}
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.muted}
          secureTextEntry={isPassword && hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {isPassword ? (
          <Pressable onPress={() => setHidden(!hidden)} hitSlop={10}>
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color={COLORS.muted} />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : helper ? (
        <Text style={styles.helper}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 4, marginBottom: 16 }, // Auto layout vertikal, gap 4
  label: { ...TYPE.small, color: COLORS.text }, // Small 14
  field: {
    flexDirection: 'row', // ikon + input menyamping
    alignItems: 'center',
    gap: 8,
    height: 48, // H 48
    paddingHorizontal: 12, // padding 12
    borderWidth: 1, // Stroke 1 #D6E2F5
    borderColor: COLORS.border,
    borderRadius: 10, // Corner radius 10
    backgroundColor: COLORS.card,
  },
  fieldFocus: { borderColor: COLORS.primary },
  fieldError: { borderColor: COLORS.danger, borderWidth: 1.5 }, // State=Error: stroke 1.5
  input: { flex: 1, ...TYPE.body, color: COLORS.text, paddingVertical: 0 }, // Body 15
  helper: { ...TYPE.caption, color: COLORS.muted }, // Caption 13
  error: { ...TYPE.caption, color: COLORS.danger },
});
