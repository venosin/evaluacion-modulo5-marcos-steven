import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '../firebase';

export default function EditUserScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [titulo, setTitulo] = useState('');
  const [anio, setAnio] = useState('');
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre || '');
          setTitulo(data.titulo || '');
          setAnio(data.anio || '');
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (!nombre || !titulo || !anio) {
      Alert.alert('Todos los campos son obligatorios');
      return;
    }
    try {
      const docRef = doc(db, 'usuarios', user.uid);
      await updateDoc(docRef, { nombre, titulo, anio });
      Alert.alert('Datos actualizados');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Información</Text>
      <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
      <TextInput placeholder="Título universitario" style={styles.input} value={titulo} onChangeText={setTitulo} />
      <TextInput placeholder="Año de graduación" style={styles.input} value={anio} onChangeText={setAnio} keyboardType="numeric" />
      <Button title="Guardar cambios" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
});
