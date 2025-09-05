import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, user => {
      setTimeout(() => {
        if (user) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      }, 1500); // 1.5 segundos para ver la splash
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/splash-icon.png')} style={styles.logo} />
        <Text style={styles.title}>Evaluación Módulo 5</Text>
      </View>
      <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 40 }} />
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaf6fb',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#007bff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 8,
    letterSpacing: 1,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
    textAlign: 'center',
  },
});
