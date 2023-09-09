import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';
import Home from '../screens/home/Home';
import Appointment from '../screens/appointment/Appointment';
import MyImsDay from '../screens/imsday/MyImsDay';
import Message from '../screens/message/Message';
import More from '../screens/home/More';
import {COLORS, IMGS, ROUTES} from '../constants';
import Header from '../../shared/Header';
import MessageStack from '../routes/MessageStack';
import {useTranslation} from 'react-i18next';
import AppointmentStack from '../routes/AppointmentStack';
import React from "react";

const Tab = createBottomTabNavigator();

export default function TabNavigator({navigation}: {navigation: any}) {
  const {t, i18n} = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.secondary,
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: 6,
          height: 56,
        },
      }}>
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={Home}
        options={({navigation}) => {
          return {
            tabBarLabel: t('home.title'),
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="home" color={color} size={28} />
            ),
            header: () => (
              <Header navigation={navigation} title={t('home.title')} />
            ),
          };
        }}
      />
      <Tab.Screen
        name="MyImsDay"
        component={MyImsDay}
        options={{
          tabBarLabel: t('myDayAtIms.title'),
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-edit-outline"
              color={color}
              size={28}
            />
          ),
          header: () => (
            <Header navigation={navigation} title={t('myDayAtIms.title')} />
          ),
        }}
      />
      <Tab.Screen
        name="Message_tab"
        component={MessageStack}
        options={{
          tabBarLabel: t('message.title'),
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="add-circle-outline" color={color} size={28} />
          ),
          header: () => (
            <Header navigation={navigation} title={t('message.title')} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Appointment_tab"
        component={AppointmentStack}
        options={{
          unmountOnBlur: true,
          tabBarLabel: t('appointment.title'),
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="event-note" color={color} size={28} />
          ),
          header: () => (
            <Header navigation={navigation} title={t('appointment.title')} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: 'Plus',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="more-horiz" color={color} size={28} />
          ),
          header: () => <Header navigation={navigation} title="More" />,
        }}
      />
    </Tab.Navigator>
  );
}
