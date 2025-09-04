import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '../firebase';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [titulo, setTitulo] = useState('');
  const [anio, setAnio] = useState('');
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleRegister = async () => {
    if (!nombre || !email || !password || !titulo || !anio) {
      Alert.alert('Todos los campos son obligatorios');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'usuarios', user.uid), {
        nombre,
        email,
        titulo,
        anio,
      });
      Alert.alert('Registro exitoso');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
      <TextInput placeholder="Correo electrónico" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="Título universitario" style={styles.input} value={titulo} onChangeText={setTitulo} />
      <TextInput placeholder="Año de graduación" style={styles.input} value={anio} onChangeText={setAnio} keyboardType="numeric" />
      <Button title="Registrarse" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>¿Ya tienes cuenta? Inicia sesión</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
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
  link: {
    color: '#007bff',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});
