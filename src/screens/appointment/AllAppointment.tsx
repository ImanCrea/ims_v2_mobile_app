import React, {useState} from 'react';
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
import {COLORS} from '../../constants';
import FloatingButton from '../../components/ui/FloatingButton';
import {TextInput} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import appointmentData from '../../../data/appointmentData';
import AppointmentItem from './AppointmentItem';
import SelectField from '../../components/ui/SelectField';
import userData from '../../../data/userData';
import DatePicker from 'react-native-date-picker';
import FlatButtom from '../../components/ui/FlatButtom';
import {format} from 'date-fns';
import {fr, enUS} from 'date-fns/locale';

export default function AllAppointment() {
  const inputProps = {enterKeyHint: 'search'};
  const [addModal, setAddModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [openStartTime, setStartTimeOpen] = useState(false);
  const [endTime, setEndTime] = useState(startTime);
  const [openEndTime, setEndTimeOpen] = useState(false);

  const handleModalClose = () => {
    setOpen(false);
    setStartTimeOpen(false);
    setEndTimeOpen(false);
    setAddModal(false);
  };
  const handleUserSelectChange = (item: any, index: number) => {
    console.log(item, index);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      enabled={true}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color={COLORS.gray} />
            <TextInput
              style={styles.input}
              placeholder="Search"
              {...inputProps}
            />
          </View>
        </View>
        

        <ScrollView style={styles.listContainer}>
          {appointmentData.map((appointment, index) => (
            <AppointmentItem key={appointment.id} data={appointment} />
          ))}
        </ScrollView>

        <Modal
          visible={addModal}
          animationType="slide"
          style={{marginTop: 100}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <View style={styles.modalTitle}>
                  <Text style={styles.modalTitleText}>New Appointment</Text>
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <MaterialIcons
                    name="close"
                    size={22}
                    color={COLORS.gray}
                    onPress={() => setAddModal(false)}
                  />
                </TouchableWithoutFeedback>
              </View>

              <ScrollView style={styles.modalContent}>
                <View style={styles.inputField}>
                  <Text style={styles.modalInputLabel}>Child</Text>
                  <TextInput
                    style={styles.inputModal}
                    editable={false}
                    value="Ali Deka"
                  />
                </View>

                <View style={styles.inputField}>
                  <Text style={styles.modalInputLabel}>Teacher/Admin</Text>

                  <SelectField
                    data={userData}
                    placeholder="Select teacher or admin"
                    onSelect={(item: any, index: number) =>
                      handleUserSelectChange(item, index)
                    }
                  />
                </View>

                <View style={styles.inputField}>
                  <Text style={styles.modalInputLabel}>Title</Text>
                  <TextInput
                    style={styles.inputModal}
                    placeholder="Enter title"
                    onChangeText={() => {}}
                  />
                </View>

                <View style={styles.inputField}>
                  <Text style={styles.modalInputLabel}>Description</Text>
                  <TextInput
                    multiline
                    style={styles.inputModal}
                    placeholder="Description"
                    onChangeText={() => {}}
                  />
                </View>

                <View style={styles.inputField}>
                  <Text style={styles.modalInputLabel}>Date</Text>
                  <Pressable onPress={() => setOpen(true)}>
                    <Text style={styles.inputModal}>
                      {format(date, 'P', {locale: enUS})}
                    </Text>
                  </Pressable>
                </View>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  locale="us"
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />

                <View style={styles.inputField}>
                  <Text style={styles.modalInputLabel}>Start time</Text>
                  <Pressable onPress={() => setStartTimeOpen(true)}>
                    <Text style={styles.inputModal}>
                      {format(startTime, 'p', {locale: enUS})}
                    </Text>
                  </Pressable>
                </View>
                <DatePicker
                  modal
                  open={openStartTime}
                  date={startTime}
                  mode="time"
                  locale="us"
                  onConfirm={startTime => {
                    setStartTimeOpen(false);
                    setStartTime(startTime);
                    setEndTime(startTime);
                  }}
                  onCancel={() => {
                    setStartTimeOpen(false);
                  }}
                />

                <View style={{...styles.inputField, marginBottom: 40}}>
                  <Text style={styles.modalInputLabel}>End time</Text>
                  <Pressable onPress={() => setEndTimeOpen(true)}>
                    <Text style={styles.inputModal}>
                      {format(endTime, 'p', {locale: enUS})}
                    </Text>
                  </Pressable>
                </View>
                <DatePicker
                  modal
                  open={openEndTime}
                  date={endTime}
                  minimumDate={startTime}
                  mode="time"
                  locale="us"
                  onConfirm={endTime => {
                    setEndTimeOpen(false);
                    setEndTime(endTime);
                  }}
                  onCancel={() => {
                    setEndTimeOpen(false);
                  }}
                />

                <FlatButtom
                  title={'Save appointment'}
                  fontWeight="500"
                  fontSize={16}
                  backgroundColor={COLORS.secondary}
                  paddingVertical={12}
                  borderRadius={20}
                  onPress={() => {}}
                />
                <View style={{marginTop: 20}} />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={styles.floatinBtn}>
          <FloatingButton onPress={() => setAddModal(true)} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

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
  searchContainer:{
    padding:10,
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
    padding:10,
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
});
