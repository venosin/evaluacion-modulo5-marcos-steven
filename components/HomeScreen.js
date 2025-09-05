import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
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
          setUserData(docSnap.data());
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
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
      <View style={styles.logoContainer}>
        <Image source={require('../assets/splash-icon.png')} style={styles.logo} />
        <Text style={styles.title}>Bienvenido, {userData?.nombre || 'Usuario'}!</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{userData?.email}</Text>
        <Text style={styles.label}>Título universitario:</Text>
        <Text style={styles.info}>{userData?.titulo}</Text>
        <Text style={styles.label}>Año de graduación:</Text>
        <Text style={styles.info}>{userData?.anio}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditUser')}>
          <Text style={styles.buttonText}>Editar mi información</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaf6fb',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  logo: {
    width: 80,
    height: 80,
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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
    letterSpacing: 1,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    alignSelf: 'center',
    marginTop: 6,
  },
  label: {
    fontWeight: 'bold',
    color: '#007bff',
    fontSize: 16,
    marginTop: 8,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 18,
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
    fontSize: 17,
    letterSpacing: 1,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: '#d9534f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 1,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
