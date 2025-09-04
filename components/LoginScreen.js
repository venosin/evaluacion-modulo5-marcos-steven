import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput placeholder="Correo electrónico" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Ingresar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>¿No tienes cuenta? Regístrate</Text>
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
