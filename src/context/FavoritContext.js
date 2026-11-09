import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritContext = createContext(null);
const STORAGE_KEY = 'katalogku:favorit'; // kunci penyimpanan di HP

export function FavoritProvider({ children }) {
  const [favorit, setFavorit] = useState([]); // daftar produk favorit
  const [siap, setSiap] = useState(false); // true setelah data lama selesai dibaca

  // Tantangan: baca favorit tersimpan saat Provider pertama kali dibuka
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => { if (json) setFavorit(JSON.parse(json)); })
      .catch(() => {}) // data rusak/tidak ada -> mulai dari kosong
      .finally(() => setSiap(true));
  }, []);

  // ...lalu simpan setiap kali favorit berubah.
  // Menunggu `siap` agar array kosong awal tidak menimpa data lama.
  useEffect(() => {
    if (siap) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorit)).catch(() => {});
  }, [favorit, siap]);

  const isFavorit = (id) => favorit.some((p) => p.id === id);

  // Update berbasis prev + immutable (filter / spread, bukan push)
  const toggleFavorit = (produk) => {
    setFavorit((prev) =>
      prev.some((p) => p.id === produk.id)
        ? prev.filter((p) => p.id !== produk.id) // hapus
        : [...prev, produk]); // tambah
  };

  const value = { favorit, isFavorit, toggleFavorit };
  return <FavoritContext.Provider value={value}>{children}</FavoritContext.Provider>;
}

// Custom hook agar screen cukup memanggil useFavorit()
export function useFavorit() {
  const ctx = useContext(FavoritContext);
  if (!ctx) throw new Error('useFavorit harus dipakai di dalam <FavoritProvider>');
  return ctx;
}
