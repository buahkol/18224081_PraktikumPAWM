// Font dari Text styles Figma (Montserrat). Dimuat di App.js dengan useFonts.
// Catatan: di Android jangan pakai fontWeight bersama font kustom,
// cukup ganti fontFamily sesuai ketebalan.
export const FONTS = {
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semibold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
};

// Text styles Figma -> StyleSheet (line height 140% dibulatkan).
export const TYPE = {
  heading: { fontFamily: FONTS.bold, fontSize: 20, lineHeight: 28 }, // Heading · 20 Bold
  body: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 21 }, // Body · 15 Regular
  small: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 20 }, // Small · 14 Regular
  caption: { fontFamily: FONTS.medium, fontSize: 13, lineHeight: 18 }, // Caption · 13 Medium
  button: { fontFamily: FONTS.semibold, fontSize: 15, lineHeight: 21 }, // Button · 15 Semi Bold
};

// Drop shadow Figma: X0 Y4 Blur12 #2F80ED 10% (dipakai Button, Card, tombol back).
export const shadow = (color) => ({ boxShadow: `0px 4px 12px ${color}1A` });
