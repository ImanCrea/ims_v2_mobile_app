import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Image,
  Pressable,
} from 'react-native';
import { COLORS} from '../../constants';
import FloatingButton from '../../components/ui/FloatingButton';
import { TextInput } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppointmentItem from './AppointmentItem';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { withSnackbar } from "../../components/ui/SnackbarHOC";
import AppointmentForm from "./AppointmentForm";

const newAppointmentFormSchema = yup.object({
  appointmentTitle: yup.string().required().min(3),
  appointmentDescription: yup.string(),
});

function AllAppointment({navigation, snackbarShowMessage}:{navigation:any, snackbarShowMessage:any}) {
  const inputProps = { enterKeyHint: 'search' };
  const [addModal, setAddModal] = useState(false);
  const { t, i18n } = useTranslation();
  const { selectedChild } = useSelector((state: any) => state.child);
  const { teacherSelected } = useSelector((state: any) => state.employee);
  const { allAppointmentList } = useSelector((state: any) => state.appointment);
  const [teacherDest, setTeacherDest] = useState<any>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      enabled={true}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color={COLORS.gray} />
            <TextInput
              style={styles.input}
              placeholder={t("allAppointment.search")}
              {...inputProps}
            />
          </View>
        </View>

        <ScrollView style={styles.listContainer}>
          {allAppointmentList.length > 0 && allAppointmentList.map((appointment: any) => <AppointmentItem key={appointment.id} data={appointment} snackbarShowMessage={snackbarShowMessage} />)}
          {(allAppointmentList.length === 0 || false) && (<View><Text style={{textAlign:"center"}}>{t('appointment.empty_appointment')}</Text></View>)}
        </ScrollView>

        <AppointmentForm
          addModal={addModal}
          setAddModal={setAddModal}
          newAppointmentFormSchema={newAppointmentFormSchema}
          teacherDest={teacherDest}
          selectedChild={selectedChild}
          teacherSelected={teacherSelected}
          setTeacherDest={setTeacherDest}
        />


        <View style={styles.floatinBtn}>
          <FloatingButton onPress={() => {
            setTeacherDest(null);
            setAddModal(true);
          }} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default withSnackbar(AllAppointment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: COLORS.white,
  },
  backgroundImage: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  // contentContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  floatinBtn: {
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    bottom: 5,
    right: 1,
    elevation: 2,
    backgroundColor: COLORS.secondary,
  },
  searchContainer: {
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: COLORS.grayVeryLight,
    borderRadius: 6,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 3,
    fontSize: 16,
    borderRadius: 0,
    color: COLORS.gray,
    marginLeft: 4,
  },
  listContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
  },
  modalContainer: {
    flex: 1,
    padding: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  modalTitle: {
    flex: 1,
    alignItems: 'center',
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLORS.secondary,
  },
  modalContent: {
    flex: 1,
    paddingTop: 20,
  },
  inputModal: {
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    zIndex: 0,
  },
  inputField: {
    marginBottom: 15,
  },
  modalInputLabel: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLORS.grayLight,
    paddingLeft: 2,
    paddingBottom: 5,
  },

  dropdown3BtnStyle: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.grayMedium,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  dropdown3BtnImage: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
    borderRadius: 35,
  },
  dropdown3BtnTxt: {
    flex: 1,
    color: COLORS.gray,
    textAlign: 'left',
    fontSize: 16,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {
    backgroundColor: COLORS.white
  },
  dropdown3RowStyle: {
    borderColor: COLORS.grayVeryLight,
    borderBottomColor: COLORS.grayVeryLight,
    //height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownRowImage: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
    borderRadius: 35,
  },
  dropdown3RowTxt: {
    color: COLORS.gray,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 12,
  },
});
