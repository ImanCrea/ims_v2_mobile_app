import React, { useState } from "react";
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
} from "react-native";
import { COLORS } from "../../constants";
import FloatingButton from "../../components/ui/FloatingButton";
import { TextInput } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import appointmentData from "../../../data/appointmentData";
import AppointmentItem from "./AppointmentItem";
import SelectDropdown from 'react-native-select-dropdown'

export default function AllAppointment2() {
  const inputProps = { enterKeyHint: "search" };
  const [addModal, setAddModal] = useState(false);
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  const addAppointment = () => {
    setAddModal(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      enabled={true}
    >
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            {...inputProps}
          />
        </View>

        <ScrollView style={styles.listContainer}>
          {appointmentData.map((appointment, index) => (
            <AppointmentItem key={appointment.id} data={appointment} />
          ))}
        </ScrollView>

        <Modal
          visible={addModal}
          animationType="slide"
          style={{ marginTop: 100 }}
        >
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

              <View style={styles.modalContent}>
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
                  
                  <SelectDropdown
                    data={countries}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    defaultButtonText={'Select teacher'}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                      return <MaterialIcons name={isOpened ? 'expand-less' : 'expand-more'} size={22} color={COLORS.gray} />
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                    
                  />
                  
                  {/* <TextInput
                    style={styles.inputModal}
                    placeholder="Teacher / admin"
                    onChangeText={() => {}}
                  /> */}
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
              </View>
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
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  floatinBtn: {
    width: 50,
    height: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    bottom: 5,
    right: 1,
    elevation: 2,
    backgroundColor: COLORS.secondary,
  },
  searchBar: {
    flexDirection: "row",
    marginTop: 10,
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: COLORS.grayVeryLight,
    borderRadius: 6,
    alignItems: "center",
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
    paddingTop: 15,
  },
  modalContainer: {
    flex: 1,
    padding: 15,
  },
  modalHeader: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 5,
  },
  modalTitle: {
    flex: 1,
    alignItems: "center",
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
    color: COLORS.secondary,
  },
  modalContent: {
    flex: 1,
    paddingTop: 20,
    //backgroundColor: "red",
  },
  inputModal: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    zIndex:0,
  },
  inputField: {
    marginBottom: 15,
  },
  modalInputLabel: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 1,
    color: COLORS.grayLight,
    paddingLeft: 2,
    paddingBottom: 5,
  },


  dropdown1BtnStyle: {
    width: '100%',
    //height: 50,
    backgroundColor: COLORS.white,
    padding:0,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.grayVeryLight,
  },
  dropdown1BtnTxtStyle: {
    color: COLORS.gray,
    fontSize:16,
    textAlign: 'left',
    paddingLeft:0,
  },
  dropdown1DropdownStyle: {
    backgroundColor: COLORS.white
  },
  dropdown1RowStyle: {
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.grayVeryLight
  },
  dropdown1RowTxtStyle: {
    color: COLORS.gray,
    textAlign: 'left',
    fontSize:16,
    
  },
});
