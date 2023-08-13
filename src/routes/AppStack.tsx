import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '../navigations/DrawerNavigator';


export default function AppStack() {

    const Stack = createNativeStackNavigator();
    return (
        <DrawerNavigator />
    );
}
