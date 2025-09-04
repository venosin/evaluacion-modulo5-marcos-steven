import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
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
      <Text style={styles.title}>Bienvenido, {userData?.nombre || 'Usuario'}!</Text>
      <Text>Email: {userData?.email}</Text>
      <Text>Título: {userData?.titulo}</Text>
      <Text>Año de graduación: {userData?.anio}</Text>
      <View style={{ marginTop: 24 }}>
        <Button title="Editar mi información" onPress={() => navigation.navigate('EditUser')} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Cerrar sesión" color="#d9534f" onPress={handleLogout} />
      </View>
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
    marginBottom: 16,
  },
});
