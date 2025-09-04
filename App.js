import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './components/SplashScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import EditUserScreen from './components/EditUserScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="EditUser" component={EditUserScreen} options={{ title: 'Editar Usuario' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
