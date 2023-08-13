import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IMGS, ROUTES } from '../constants';
import Header from '../../shared/Header';
import Message from '../screens/message/Message';
import Conversation from '../screens/message/Conversation';
import HeaberWithBackButton from '../../shared/HeaberWithBackButton';

export default function MessageStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
    >
        <Stack.Screen 
            name={ROUTES.MESSAGE} 
            component={Message}
            options={({ navigation }) => {
                return {
                header: () => <Header navigation={navigation} title={ROUTES.MESSAGE} />,
                };
            }}
        />
        <Stack.Screen 
            name={ROUTES.MESSAGE_DETAILS} 
            component={Conversation}
            // options={{
            //     title: 'Message',
            // }}
            options={({ navigation }) => {
                return {
                    headerBackTitleVisible: true,
                    header: () => <HeaberWithBackButton 
                        navigation={navigation} 
                        title={ROUTES.MESSAGE_DETAILS_TITLE} 
                        backRouteName={ROUTES.MESSAGE} 
                    />,
                };
            }}
        />
    </Stack.Navigator>
  )
}
