import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Por favor ingresa correo y contraseña');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.logoContainer}>
        <Image source={require('../assets/splash-icon.png')} style={styles.logo} />
        <Text style={styles.title}>Iniciar Sesión</Text>
      </View>
      <View style={styles.formBox}>
        <TextInput placeholder="Correo electrónico" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>¿No tienes cuenta? Regístrate</Text>
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
