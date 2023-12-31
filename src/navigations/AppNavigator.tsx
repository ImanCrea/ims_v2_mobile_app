import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import PasswordForget from '../screens/auth/PasswordForget';
import { ROUTES } from '../constants';
import TabNavigator from './TabNavigator';
import AppointmentDetails from "../screens/appointment/AppointmentDetails";
import HeaberWithBackButton from "../../shared/HeaberWithBackButton";
import { useTranslation } from "react-i18next";
import AppointmentStack from "../routes/AppointmentStack";


export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  const {t, i18n} = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={PasswordForget} /> */}
      <Stack.Screen name={"TabNavigator"} component={TabNavigator} />

    </Stack.Navigator>
  );
}


