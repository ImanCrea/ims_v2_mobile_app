import React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import PasswordForget from './PasswordForget';

const Stack = createNativeStackNavigator();

function MyApp() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,}}>
      <Stack.Screen name="Login1" component={Login} />
      <Stack.Screen name="ForgotPassword1" component={PasswordForget} />
    </Stack.Navigator>
  );
}

export default MyApp;
