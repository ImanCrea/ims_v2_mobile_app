import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants';
import Profile from '../screens/drawer/Profile';
import Header from '../../shared/Header';

export default function ProfilStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
    >
      <Stack.Screen 
        name={ROUTES.PROFILE} 
        component={Profile}
        options={({ navigation }) => {
            return {
              header: () => <Header navigation={navigation} title={ROUTES.PROFILE} />,
            };
          }}
    />
    </Stack.Navigator>
  )
}
