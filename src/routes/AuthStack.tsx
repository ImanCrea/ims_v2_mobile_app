import React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import PasswordForget from '../screens/auth/PasswordForget';
import { ROUTES } from '../constants';
import TabNavigator from '../navigations/TabNavigator';


export default function AuthStack() {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={PasswordForget} />
      {/* <Stack.Screen name={"TabNavigator"} component={TabNavigator} /> */}
    </Stack.Navigator>
  );
}
