import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.logoContainer}>
        <Image source={require('../assets/splash-icon.png')} style={styles.logo} />
        <Text style={styles.title}>Registro de Usuario</Text>
      </View>
      <View style={styles.formBox}>
        <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
        <TextInput placeholder="Correo electrónico" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput placeholder="Título universitario" style={styles.input} value={titulo} onChangeText={setTitulo} />
        <TextInput placeholder="Año de graduación" style={styles.input} value={anio} onChangeText={setAnio} keyboardType="numeric" />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>¿Ya tienes cuenta? Inicia sesión</Text>
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
  link: {
    color: '#007bff',
    marginTop: 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontSize: 15,
  },
});
