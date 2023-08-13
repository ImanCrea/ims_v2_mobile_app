import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants';
import Settings from '../screens/drawer/Settings';
import Header from '../../shared/Header';

export default function SettingsStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
    >
      <Stack.Screen 
        name={ROUTES.SETTINGS} 
        component={Settings}
        options={({ navigation }) => {
            return {
              header: () => <Header navigation={navigation} title={ROUTES.SETTINGS} />,
            };
          }}
    />
    </Stack.Navigator>
  )
}
