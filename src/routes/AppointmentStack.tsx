import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {ROUTES} from '../constants';
import Appointment from '../screens/appointment/Appointment';
import Header from '../../shared/Header';
import AppointmentDetails from '../screens/appointment/AppointmentDetails';
import HeaberWithBackButton from '../../shared/HeaberWithBackButton';
import PresetAppointmentDetails from '../screens/appointment/PresetAppointmentDetails';

export default function AppointmentStack() {
  const Stack = createNativeStackNavigator();
  const {t, i18n} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.APPOINTMENT}
        component={Appointment}
        options={({navigation}) => {
          return {
            header: () => (
              <Header navigation={navigation} title={t('appointment.title')} />
            ),
          };
        }}
      />
      <Stack.Screen
        name={ROUTES.APPOINTMENT_DETAILS}
        component={AppointmentDetails}
        options={({navigation}) => {
          return {
            headerBackTitleVisible: true,
            header: () => (
              <HeaberWithBackButton
                navigation={navigation}
                title={t('appointment.details_title')}
                backRouteName={ROUTES.APPOINTMENT}
              />
            ),
          };
        }}
      />

      <Stack.Screen
        name={ROUTES.PRESET_APPOINTMENT_DETAILS}
        component={PresetAppointmentDetails}
        options={({navigation}) => {
          return {
            headerBackTitleVisible: true,
            header: () => (
              <HeaberWithBackButton
                navigation={navigation}
                title={t('appointment.preset_details_title')}
                backRouteName={ROUTES.APPOINTMENT}
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}
