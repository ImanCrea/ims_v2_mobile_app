import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IMGS, ROUTES} from '../constants';
import Header from '../../shared/Header';
import Message from '../screens/message/Message';
import Conversation from '../screens/message/Conversation';
import HeaberWithBackButton from '../../shared/HeaberWithBackButton';
import {useTranslation} from 'react-i18next';
import ContactNewMessage from '../screens/message/ContactNewMessage';
import NewConversation from '../screens/message/NewConversation';

export default function MessageStack() {
  const Stack = createNativeStackNavigator();
  const {t, i18n} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.MESSAGE}
        component={Message}
        options={({navigation}) => {
          return {
            header: () => (
              <Header navigation={navigation} title={t('message.title')} />
            ),
          };
        }}
      />
      <Stack.Screen
        name={ROUTES.MESSAGE_DETAILS}
        component={Conversation}
        options={({navigation}) => {
          return {
            headerBackTitleVisible: true,
            header: () => (
              <HeaberWithBackButton
                navigation={navigation}
                title={t('conversationMessage.title')}
                backRouteName={ROUTES.MESSAGE}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name={ROUTES.MESSAGE_CONTACT_NEW_MESSAGE}
        component={ContactNewMessage}
        options={({navigation}) => {
          return {
            headerBackTitleVisible: true,
            header: () => (
              <HeaberWithBackButton
                navigation={navigation}
                title={t('contactNewMessage.title')}
                backRouteName={ROUTES.MESSAGE}
              />
            ),
          };
        }}
      />

      <Stack.Screen
        name={ROUTES.MESSAGE_NEW_MESSAGE}
        component={NewConversation}
        options={({navigation}) => {
          return {
            headerBackTitleVisible: true,
            header: () => (
              <HeaberWithBackButton
                navigation={navigation}
                title={t('message.title')}
                backRouteName={ROUTES.MESSAGE_CONTACT_NEW_MESSAGE}
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}
