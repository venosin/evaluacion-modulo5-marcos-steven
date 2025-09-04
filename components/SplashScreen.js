import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
      <Text style={{ marginTop: 20 }}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
