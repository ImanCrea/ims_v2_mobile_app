import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS, CONSTANT, IMGS } from "../../constants";
import { Formik } from "formik";
import { format, getHours, getMinutes, getTime, set } from "date-fns";
import { request } from "../../api/ApiManager";
import { addNewAppointment } from "../../features/appointment/appointmentSlice";
import { TextInput } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import { BASEURL_IMG } from "../../api/appUrl";
import { globalStyles } from "../../styles/global";
import { enUS, fr } from "date-fns/locale";
import DatePicker from "react-native-date-picker";
import FlatButtom from "../../components/ui/FlatButtom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

function AppointmentEditForm(props:any) {
  const {
    addModal,
    setAddModal,
    newAppointmentFormSchema,
    teacherDest,
    selectedChild,
    teacherSelected,
    setTeacherDest,
  } = props;

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [errorMsgTeacher, setErrorMsgTeacher] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [openStartTime, setStartTimeOpen] = useState(false);
  const [endTime, setEndTime] = useState(startTime);
  const [openEndTime, setEndTimeOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const today = new Date();

  const handleTeacherSelectChange = (item: any, index: number) => {
    setTeacherDest(item);
    setErrorMsgTeacher('');
  };

  useEffect(() => {
    console.log(teacherSelected)
    setTeacherDest(teacherSelected);
  }, [])

  return (
    <Modal
      visible={addModal}
      animationType="slide"
      style={{ marginTop: 100 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}>{t("allAppointment.new_appointment")}</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <MaterialIcons
                name="close"
                size={22}
                color={COLORS.gray}
                onPress={() => {
                  setAddModal(false);
                }}
              />
            </TouchableWithoutFeedback>
          </View>

          <ScrollView style={styles.modalContent}>
            <Formik
              initialValues={{
                appointmentTitle: '',
                appointmentDescription: '',
                appointmentTeacher: '',
              }}
              validationSchema={newAppointmentFormSchema}
              onSubmit={(data: any, actions: any) => {
                if (teacherDest !== null) {
                  setErrorMsgTeacher('');
                  const dateDebut = set(date, { hours: getHours(startTime), minutes: getMinutes(startTime) });
                  const dateFin = set(date, { hours: getHours(endTime), minutes: getMinutes(endTime) });

                  const dataToSend = {
                    //id: 0,
                    meetingType: "NORMAL",
                    dateDebut: getTime(dateDebut),
                    dateFin: getTime(dateFin),
                    objet: data.appointmentTitle,
                    details: data.appointmentDescription,
                    //classeId: selectedChild !== null ? selectedChild.eleves[0].classe.id : null,
                    //classeId:  0,
                    maxInviter: 1,
                    dureeMeeting: 0,
                    deadlineUpdate: 0,
                    meetingStatus: "WAIT",
                    totalCreneau: 1,
                    maxEnfantChoice: 0,
                    creneauRdvs: [],
                    common: CONSTANT.common,
                  }

                  request('POST', `/extra/rdv/${selectedChild !== null ? selectedChild.person.id : null}/${teacherDest.person.id}`, dataToSend)
                    .then(response => {

                      dispatch(addNewAppointment(response.data));
                      actions.resetForm({
                        values: {
                          appointmentTitle: '',
                          appointmentDescription: '',
                          appointmentTeacher: '',
                        },
                      })

                      setDate(new Date());
                      setStartTime(new Date());
                      setEndTime(new Date());
                      setAddModal(false);

                    })
                    .catch(error => {
                      if (error.code === 'ERR_NETWORK') {
                        //setErrorMessage(t('login.network_error'));
                      } else {
                        //error.response.data.message
                        //setErrorMessage(t('login.acces_error'));
                      }
                      console.log(JSON.stringify(error));
                      //console.log(JSON.stringify(error.config));
                    });
                }
                else {
                  setErrorMsgTeacher(t('login.required_field'));
                }

              }}>
              {formikProps => (
                <>
                  <View style={styles.inputField}>
                    <Text style={styles.modalInputLabel}>{t("allAppointment.child_field_label")}</Text>
                    <TextInput
                      style={styles.inputModal}
                      editable={false}
                      value={selectedChild !== null ? `${selectedChild.person.prenom} ${selectedChild.person.nom}` : ''}
                    />
                  </View>

                  <View style={styles.inputField}>
                    <Text style={styles.modalInputLabel}>{t("allAppointment.employee_field_label")}</Text>
                    <SelectDropdown
                      data={[teacherSelected]}
                      onSelect={(selectedItem, index) => {
                        handleTeacherSelectChange(selectedItem, index);
                      }}
                      buttonStyle={styles.dropdown3BtnStyle}
                      renderCustomizedButtonChild={(selectedItem: any, index: any) => {
                        return (
                          <View style={styles.dropdown3BtnChildStyle}>
                            {selectedItem ? (
                              <Image
                                source={ selectedItem.person.photo !== "" ? { uri: `${BASEURL_IMG}/${selectedItem.person.photo}` } : IMGS.avatar}
                                style={styles.dropdown3BtnImage}
                              />
                            ) : (
                              <MaterialIcons
                                name="person-outline"
                                color={COLORS.gray}
                                size={30}
                              />
                            )}
                            <Text style={styles.dropdown3BtnTxt}>
                              {selectedItem ? `${selectedItem.person.prenom} ${selectedItem.person.nom}` : t("allAppointment.employee_select_placeholder")}
                            </Text>
                            <MaterialIcons name="expand-more" color={COLORS.gray} size={22} />
                          </View>
                        );
                      }}
                      dropdownStyle={styles.dropdown3DropdownStyle}
                      rowStyle={styles.dropdown3RowStyle}
                      renderCustomizedRowChild={(item: any, index: any) => {
                        return (
                          <View style={styles.dropdown3RowChildStyle}>
                            <Image
                              source={ item !== null && item.person.photo !== "" ? { uri: `${BASEURL_IMG}/${item.person.photo}` } : IMGS.avatar }
                              style={styles.dropdownRowImage}
                            />
                            <Text style={styles.dropdown3RowTxt}>{item !== null ? item.person.prenom : ''} {item !== null ? item.person.nom : ''}</Text>
                          </View>
                        );
                      }}
                    />
                    <Text style={{ ...globalStyles.errorText }}>
                      {errorMsgTeacher}
                    </Text>
                  </View>

                  <View style={styles.inputField}>
                    <Text style={styles.modalInputLabel}>{t("allAppointment.title_field_label")}</Text>
                    <TextInput
                      style={styles.inputModal}
                      placeholder={t("allAppointment.title_placeholder")}
                      onChangeText={formikProps.handleChange('appointmentTitle')}
                      value={formikProps.values.appointmentTitle}
                      onBlur={formikProps.handleBlur('appointmentTitle')}
                    />
                    <Text
                      style={{ ...globalStyles.errorText }}>
                      {formikProps.touched.appointmentTitle &&
                      formikProps.errors.appointmentTitle && (
                        <Text>{t('login.required_field')}</Text>
                      )}
                    </Text>
                  </View>


                  <View style={styles.inputField}>
                    <Text style={styles.modalInputLabel}>{t("allAppointment.description_field_label")}</Text>
                    <TextInput
                      multiline
                      style={styles.inputModal}
                      placeholder={t("allAppointment.description_placeholder")}
                      onChangeText={formikProps.handleChange('appointmentDescription')}
                      value={formikProps.values.appointmentDescription}
                      onBlur={formikProps.handleBlur('appointmentDescription')}
                    />
                  </View>

                  <View style={styles.inputField}>
                    <Text style={styles.modalInputLabel}>{t("allAppointment.date_field_label")}</Text>
                    <Pressable onPress={() => setOpen(true)}>
                      <Text style={styles.inputModal}>
                        {format(date, 'P', { locale: i18n.language === 'en' ? enUS : fr })}
                      </Text>
                    </Pressable>
                  </View>
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    minimumDate={today}
                    locale={i18n.language}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />

                  <View style={styles.inputField}>
                    <Text style={styles.modalInputLabel}>{t("allAppointment.startime_field_label")}</Text>
                    <Pressable onPress={() => setStartTimeOpen(true)}>
                      <Text style={styles.inputModal}>
                        {format(startTime, 'p', { locale: i18n.language === 'en' ? enUS : fr })}
                      </Text>
                    </Pressable>
                  </View>
                  <DatePicker
                    modal
                    open={openStartTime}
                    date={startTime}
                    mode="time"
                    locale={i18n.language}
                    onConfirm={startTime => {
                      setStartTimeOpen(false);
                      setStartTime(startTime);
                      setEndTime(startTime);
                    }}
                    onCancel={() => {
                      setStartTimeOpen(false);
                    }}
                  />

                  <View style={{ ...styles.inputField, marginBottom: 40 }}>
                    <Text style={styles.modalInputLabel}>{t("allAppointment.endtime_field_label")}</Text>
                    <Pressable onPress={() => setEndTimeOpen(true)}>
                      <Text style={styles.inputModal}>
                        {format(endTime, 'p', { locale: i18n.language === 'en' ? enUS : fr })}
                      </Text>
                    </Pressable>
                  </View>
                  <DatePicker
                    modal
                    open={openEndTime}
                    date={endTime}
                    minimumDate={startTime}
                    mode="time"
                    locale={i18n.language}
                    onConfirm={endTime => {
                      setEndTimeOpen(false);
                      setEndTime(endTime);
                    }}
                    onCancel={() => {
                      setEndTimeOpen(false);
                    }}
                  />

                  <FlatButtom
                    title={t("allAppointment.save_form")}
                    fontWeight="500"
                    fontSize={16}
                    backgroundColor={COLORS.secondary}
                    paddingVertical={12}
                    borderRadius={20}
                    onPress={formikProps.handleSubmit}
                  />
                </>
              )}
            </Formik>

            <View style={{ marginTop: 20 }} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default AppointmentEditForm;

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