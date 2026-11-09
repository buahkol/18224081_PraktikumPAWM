import { useState } from 'react';

// Custom hook: logika form yang bisa dipakai ulang di form mana pun
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // handleChange('nama') -> fungsi untuk onChangeText, sekaligus menghapus error lama
  const handleChange = (field) => (text) => {
    setValues((prev) => ({ ...prev, [field]: text }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  // Validasi dulu; onValid hanya dipanggil jika tidak ada error
  const handleSubmit = (onValid) => () => {
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) onValid(values);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  // Latihan 3: true jika masih ada field yang kosong (untuk Button disabled)
  const adaYangKosong = Object.values(values).some((v) => String(v).trim() === '');

  return { values, errors, handleChange, handleSubmit, reset, adaYangKosong };
}
