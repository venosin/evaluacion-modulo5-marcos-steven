import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.logoContainer}>
        <Image source={require('../assets/splash-icon.png')} style={styles.logo} />
        <Text style={styles.title}>Editar Información</Text>
      </View>
      <View style={styles.formBox}>
        <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
        <TextInput placeholder="Título universitario" style={styles.input} value={titulo} onChangeText={setTitulo} />
        <TextInput placeholder="Año de graduación" style={styles.input} value={anio} onChangeText={setAnio} keyboardType="numeric" />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#eaf6fb',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#007bff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
    letterSpacing: 1,
    textAlign: 'center',
  },
  formBox: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 10,
    elevation: 6,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#b3d7f2',
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 16,
    backgroundColor: '#f7fbff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});
