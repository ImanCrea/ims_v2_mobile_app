import {
  Image,
  Keyboard, Modal, Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { COLORS, CONSTANT, IMGS } from "../../constants";
import {globalStyles} from '../../styles/global';
import FlatButtom from '../../components/ui/FlatButtom';
import {useTranslation} from 'react-i18next';
import { withSnackbar } from "../../components/ui/SnackbarHOC";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { BASEURL_IMG } from "../../api/appUrl";
import { format, getHours, getMinutes, getTime, set, toDate } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { request } from "../../api/ApiManager";
import * as yup from "yup";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import DatePicker from "react-native-date-picker";
import {
  addNewAppointment,
  removeAppointment,
  updateAppointment
} from "../../features/appointment/appointmentSlice";

const newAppointmentFormSchema = yup.object({
  appointmentTitle: yup.string().required().min(3),
  appointmentDescription: yup.string(),
});


function ButtonActionStatus(props:any) {
  const {data, snackbarShowMessage, setAppointmentDetails, parentId} = props;
  const {t, i18n} = useTranslation();
  const [editModal, setEditModal] = useState(false);
  //const [open, setOpen] = useState(false);
  const [teacherDest, setTeacherDest] = useState<any>(null);
  const { selectedChild } = useSelector((state: any) => state.child);
  const { teacherSelected } = useSelector((state: any) => state.employee);

  const [errorMsgTeacher, setErrorMsgTeacher] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [openStartTime, setStartTimeOpen] = useState(false);
  const [endTime, setEndTime] = useState(startTime);
  const [openEndTime, setEndTimeOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [bntActionStatus, setBntActionStatus] = useState('');
  const today = new Date();
  const dispatch = useDispatch();
  const status = data.meetingStatus;
  //const parentId:any = data.creneauRdvs[0].creneauRdvEnfantParents.length > 0 ? data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId : null;

  // DEADLINE MEETING
  const deadline = data.dateDebut - data.deadlineUpdate;
  const todayDeadline = new Date().setHours(0, 0, 0, 0);
  const statusDealine = deadline > todayDeadline;

  const handleTeacherSelectChange = (item: any, index: number) => {
    setTeacherDest(item);
    setErrorMsgTeacher('');
  };

  const handleConfirmAppointment = () => {
    const dataToSend = {
      id: data.id,
      meetingType: data.meetingType,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin,
      objet: data.objet,
      details: data.details,
      classeId: data.classeId,
      maxInviter: data.maxInviter,
      dureeMeeting: data.dureeMeeting,
      deadlineUpdate: data.deadlineUpdate,
      meetingStatus: data.meetingStatus,
      totalCreneau: data.totalCreneau,
      maxEnfantChoice: data.maxEnfantChoice,
      personInitor: data.personInitor,
      creneauRdvs: [
        {
          id: data.creneauRdvs[0].id,
          rdvId: data.creneauRdvs[0].rdvId,
          dateDebut: data.creneauRdvs[0].dateDebut,
          dateFin: data.creneauRdvs[0].dateFin,
          totalInviterConfirm: data.creneauRdvs[0].totalInviterConfirm,
          meetingStatus: data.creneauRdvs[0].meetingStatus,
          creneauRdvEnfantParents: [
            {
              id: data.creneauRdvs[0].creneauRdvEnfantParents[0].id,
              meetingStatus: 'CONFIRM',
              creneauRdvId: data.creneauRdvs[0].creneauRdvEnfantParents[0].creneauRdvId,
              enfantId: data.creneauRdvs[0].creneauRdvEnfantParents[0].enfantId,
              parentId: parentId,
              //parentId: data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId !== null ? data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId : parentId,
              //dateDebut: data.creneauRdvs[0].creneauRdvEnfantParents[0].dateDebut,
              dateDebut: data.creneauRdvs[0].creneauRdvEmployees[0].dateDebut,
              //dateFin: data.creneauRdvs[0].creneauRdvEnfantParents[0].dateFin,
              dateFin: data.creneauRdvs[0].creneauRdvEmployees[0].dateFin,
              commentaire: data.creneauRdvs[0].creneauRdvEnfantParents[0].commentaire,
            }
          ],
          creneauRdvEmployees: data.creneauRdvs[0].creneauRdvEmployees,
          parentNbrAction: data.creneauRdvs[0].parentNbrAction,
          employeeNbrAction: data.creneauRdvs[0].employeeNbrAction,
          common: data.creneauRdvs[0].common,
          libelle: data.creneauRdvs[0].libelle,
          compositeId: data.creneauRdvs[0].compositeId,
          _links: data.creneauRdvs[0]._links,
        }
      ],
      common: data.common,
    }

    request('PUT', `/extra/rdv/${data.id}`, dataToSend)
      .then(response => {
        dispatch(updateAppointment(response.data));

        setAppointmentDetails(response.data);
        snackbarShowMessage(t('snackBar.sb_succes_save'));
      })
      .catch(error => {
        snackbarShowMessage(t('snackBar.sb_error'));
        console.log(error);
      });
  }

  const handleEditAppointment = () => {
    setEditModal(true);
    if(data.meetingStatus === "REPORT") {
      const dateEditDebut:any = toDate(data.creneauRdvs[0].lastReportDateDebut);
      const dateEditFin:any = toDate(data.creneauRdvs[0].lastReportDateFin);
      setDate(dateEditDebut);
      setStartTime(dateEditDebut);
      setEndTime(dateEditFin);
    }

    setBntActionStatus('EDIT');
  }

  const handleRescheduleAppointment = () => {
    setEditModal(true);
    setBntActionStatus('CONFIRM');
    //console.log('Reprogrammer');
  }

  const handleCancelAppointment = () => {
    /*const dataToSend = {
      id: data.id,
      meetingType: data.meetingType,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin,
      objet: data.objet,
      details: data.details,
      classeId: data.classeId,
      maxInviter: data.maxInviter,
      dureeMeeting: data.dureeMeeting,
      deadlineUpdate: data.deadlineUpdate,
      meetingStatus: "CANCEL",
      totalCreneau: data.totalCreneau,
      maxEnfantChoice: data.maxEnfantChoice,
      creneauRdvs: data.creneauRdvs,
      common: data.common,
      personInitor: data.personInitor,
    }*/

    const dataToSend = {
      id: data.id,
      meetingType: data.meetingType,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin,
      objet: data.objet,
      details: data.details,
      classeId: data.classeId,
      maxInviter: data.maxInviter,
      dureeMeeting: data.dureeMeeting,
      deadlineUpdate: data.deadlineUpdate,
      //meetingStatus: "CANCEL",
      meetingStatus: data.meetingStatus,
      totalCreneau: data.totalCreneau,
      maxEnfantChoice: data.maxEnfantChoice,
      personInitor: data.personInitor,
      creneauRdvs: [
        {
          id: data.creneauRdvs[0].id,
          rdvId: data.creneauRdvs[0].rdvId,
          dateDebut: data.creneauRdvs[0].dateDebut,
          dateFin: data.creneauRdvs[0].dateFin,
          totalInviterConfirm: data.creneauRdvs[0].totalInviterConfirm,
          meetingStatus: data.creneauRdvs[0].meetingStatus,
          creneauRdvEnfantParents: [
            {
              id: data.creneauRdvs[0].creneauRdvEnfantParents[0].id,
              meetingStatus: "CANCEL",
              creneauRdvId: data.creneauRdvs[0].creneauRdvEnfantParents[0].creneauRdvId,
              enfantId: data.creneauRdvs[0].creneauRdvEnfantParents[0].enfantId,
              parentId: parentId,
              //parentId: data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId !== null ? data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId : parentId,
              dateDebut: data.creneauRdvs[0].creneauRdvEnfantParents[0].dateDebut,
              dateFin: data.creneauRdvs[0].creneauRdvEnfantParents[0].dateFin,
              commentaire: data.creneauRdvs[0].creneauRdvEnfantParents[0].commentaire,
            }
          ],
          creneauRdvEmployees: data.creneauRdvs[0].creneauRdvEmployees,
          parentNbrAction: data.creneauRdvs[0].parentNbrAction,
          employeeNbrAction: data.creneauRdvs[0].employeeNbrAction,
          common: data.creneauRdvs[0].common,
          libelle: data.creneauRdvs[0].libelle,
          compositeId: data.creneauRdvs[0].compositeId,
          _links: data.creneauRdvs[0]._links,
        }
      ],
      common: data.common,
    }

    //console.log('cancel');

    request('PUT', `/extra/rdv/${data.id}`, dataToSend)
      .then(response => {
        dispatch(updateAppointment(response.data));
        setAppointmentDetails(response.data);
        snackbarShowMessage(t('snackBar.sb_succes_save'));
      })
      .catch(error => {
        snackbarShowMessage(t('snackBar.sb_error'));
        console.log(error);
      });
  }

  useEffect(() => {
    const dateDebut = toDate(data.dateDebut);
    const dateFin = toDate(data.dateFin);

    setTeacherDest(teacherSelected);
    setDate(dateDebut);
    setStartTime(dateDebut);
    setEndTime(dateFin);

    // console.log(parentId);
    //console.log(data.personInitor);

  }, []);

  return (
    <View style={{ marginTop: 30, marginBottom: 10 }}>
      <View style={styles.buttomContainer}>
        <View style={{ flex: 1, paddingRight: 10 }}>
          <TouchableOpacity
            style={
              ((status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "NOT_HELD" )  && { ...styles.buttom, ...styles.normalLeftButtom, padding:8 }) ||
              ((status === "CONFIRM" || status === "NOT_RESPECTED") && statusDealine && { ...styles.buttom, ...styles.normalLeftButtom, padding:8 }) ||
              (status === "CANCEL" && { ...styles.buttom, ...styles.cancelButtom, padding:8 })
            }
            disabled={
              (status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "NOT_HELD" ) && false ||
              (status === "CONFIRM" || status === "NOT_RESPECTED") && parentId !== data.personInitor ||
              status === "CANCEL" && true
            }
            onPress={() => (
              (status === "WAIT" || status === "REPORT") && handleEditAppointment()) ||
              ((status === "CONFIRM" && (parentId === data.personInitor)) && handleCancelAppointment())
            }
          >
            {(status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "NOT_HELD" ) && (
              <Text style={styles.buttomTextLeft}>
                {t('upcomingAppointment.edit_btn')}
              </Text>
            )}

            {(status === "CONFIRM" || status === "NOT_RESPECTED" ) && statusDealine && (
              <Text style={ parentId === data.personInitor ? styles.buttomTextLeft : styles.buttomCancelText}>
                {t('upcomingAppointment.cancel_btn')}
              </Text>
            )}

            {status === "CANCEL" && (
              <Text style={styles.buttomCancelText}>
                {t('upcomingAppointment.cancel_btn')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingLeft: 10, }}>
          <TouchableOpacity
            style={
              ((status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "NOT_HELD" ) && { ...styles.buttom, backgroundColor: COLORS.primary, padding:8 }) ||
              ((status === "CONFIRM" || status === "NOT_RESPECTED" ) && statusDealine && { ...styles.buttom, backgroundColor: COLORS.primary, padding:8 }) ||
              (status === "CANCEL" && { ...styles.buttom, ...styles.cancelButtom, padding:8 })
            }
            onPress={() => ((status === "WAIT" || status === "REPORT" ) && handleConfirmAppointment()) || (status === "CONFIRM" && handleRescheduleAppointment())}
            disabled={status === "WAIT" && false || status === "CONFIRM" && false ||  status === "CANCEL" && true}
          >
            {(status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "NOT_HELD" ) && (
              <Text style={styles.buttomTextRight}>
                {t('upcomingAppointment.confirm_btn')}
              </Text>
            )}
            {(status === "CONFIRM" || status === "NOT_RESPECTED" ) && statusDealine && (
              <Text style={styles.buttomTextRight}>
                {t('upcomingAppointment.reschedule_btn')}
              </Text>
            )}

            {status === "CANCEL" && (
              <Text style={styles.buttomCancelText}>
                {t('appointmentDetails.save_btn')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={editModal}
        animationType="slide"
        style={{ marginTop: 100 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalTitleText}>{t("allAppointment.edit_appointment")}</Text>
              </View>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <MaterialIcons
                  name="close"
                  size={22}
                  color={COLORS.gray}
                  onPress={() => {
                    setEditModal(false);
                  }}
                />
              </TouchableWithoutFeedback>
            </View>

            <ScrollView style={styles.modalContent}>
              <Formik
                initialValues={{
                  appointmentTitle: data.objet,
                  appointmentDescription: data.details,
                  appointmentTeacher: '',
                }}
                validationSchema={newAppointmentFormSchema}
                onSubmit={(dataForm: any, actions: any) => {
                  if(bntActionStatus === 'EDIT'){
                    if (teacherDest !== null) {
                      setErrorMsgTeacher('');
                      const dateDebut = set(date, { hours: getHours(startTime), minutes: getMinutes(startTime) });
                      const dateFin = set(date, { hours: getHours(endTime), minutes: getMinutes(endTime) });
                      let dataToSend:any = null;

                      if(data.meetingStatus === "WAIT") {
                        if(data.personInitor === parentId) {
                          dataToSend = {
                            id: data.id,
                            meetingType: data.meetingType,
                            dateDebut: getTime(dateDebut),
                            dateFin: getTime(dateFin),
                            objet: dataForm.appointmentTitle,
                            details: dataForm.appointmentDescription,
                            classeId: data.classeId,
                            maxInviter: data.maxInviter,
                            dureeMeeting: data.dureeMeeting,
                            deadlineUpdate: data.deadlineUpdate,
                            meetingStatus: data.meetingStatus,
                            totalCreneau: data.totalCreneau,
                            maxEnfantChoice: data.maxEnfantChoice,
                            creneauRdvs: data.creneauRdvs,
                            common: data.common,
                            personInitor: data.personInitor,
                          }
                        }
                        else {
                          dataToSend = {
                            id: data.id,
                            meetingType: data.meetingType,
                            dateDebut: data.dateDebut,
                            dateFin: data.dateFin,
                            objet: data.objet,
                            details: data.details,
                            classeId: data.classeId,
                            maxInviter: data.maxInviter,
                            dureeMeeting: data.dureeMeeting,
                            deadlineUpdate: data.deadlineUpdate,
                            meetingStatus: data.meetingStatus,
                            totalCreneau: data.totalCreneau,
                            maxEnfantChoice: data.maxEnfantChoice,
                            personInitor: data.personInitor,
                            creneauRdvs: [
                              {
                                id: data.creneauRdvs[0].id,
                                rdvId: data.creneauRdvs[0].rdvId,
                                dateDebut: data.creneauRdvs[0].dateDebut,
                                dateFin: data.creneauRdvs[0].dateFin,
                                totalInviterConfirm: data.creneauRdvs[0].totalInviterConfirm,
                                meetingStatus: data.creneauRdvs[0].meetingStatus,
                                creneauRdvEnfantParents: [
                                  {
                                    id: data.creneauRdvs[0].creneauRdvEnfantParents[0].id,
                                    meetingStatus: "REPORT",
                                    creneauRdvId: data.creneauRdvs[0].creneauRdvEnfantParents[0].creneauRdvId,
                                    enfantId: data.creneauRdvs[0].creneauRdvEnfantParents[0].enfantId,
                                    parentId: parentId,
                                    //parentId: data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId !== null ? data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId : parentId,
                                    dateDebut: getTime(dateDebut),
                                    dateFin: getTime(dateFin),
                                    commentaire: data.creneauRdvs[0].creneauRdvEnfantParents[0].commentaire,
                                  }
                                ],
                                creneauRdvEmployees: data.creneauRdvs[0].creneauRdvEmployees,
                                parentNbrAction: data.creneauRdvs[0].parentNbrAction,
                                employeeNbrAction: data.creneauRdvs[0].employeeNbrAction,
                                common: data.creneauRdvs[0].common,
                                libelle: data.creneauRdvs[0].libelle,
                                compositeId: data.creneauRdvs[0].compositeId,
                                _links: data.creneauRdvs[0]._links,
                              }
                            ],
                            common: data.common,
                          }
                        }
                      }
                      else if(data.meetingStatus === "REPORT") {
                        dataToSend = {
                          id: data.id,
                          meetingType: data.meetingType,
                          dateDebut: data.dateDebut,
                          dateFin: data.dateFin,
                          objet: data.objet,
                          details: data.details,
                          classeId: data.classeId,
                          maxInviter: data.maxInviter,
                          dureeMeeting: data.dureeMeeting,
                          deadlineUpdate: data.deadlineUpdate,
                          meetingStatus: data.meetingStatus,
                          totalCreneau: data.totalCreneau,
                          maxEnfantChoice: data.maxEnfantChoice,
                          personInitor: data.personInitor,
                          creneauRdvs: [
                            {
                              id: data.creneauRdvs[0].id,
                              rdvId: data.creneauRdvs[0].rdvId,
                              dateDebut: data.creneauRdvs[0].dateDebut,
                              dateFin: data.creneauRdvs[0].dateFin,
                              totalInviterConfirm: data.creneauRdvs[0].totalInviterConfirm,
                              meetingStatus: data.creneauRdvs[0].meetingStatus,
                              creneauRdvEnfantParents: [
                                {
                                  id: data.creneauRdvs[0].creneauRdvEnfantParents[0].id,
                                  meetingStatus: "REPORT",
                                  creneauRdvId: data.creneauRdvs[0].creneauRdvEnfantParents[0].creneauRdvId,
                                  enfantId: data.creneauRdvs[0].creneauRdvEnfantParents[0].enfantId,
                                  parentId: parentId,
                                  //parentId: data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId !== null ? data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId : parentId,
                                  dateDebut: getTime(dateDebut),
                                  dateFin: getTime(dateFin),
                                  commentaire: data.creneauRdvs[0].creneauRdvEnfantParents[0].commentaire,
                                }
                              ],
                              creneauRdvEmployees: data.creneauRdvs[0].creneauRdvEmployees,
                              parentNbrAction: data.creneauRdvs[0].parentNbrAction,
                              employeeNbrAction: data.creneauRdvs[0].employeeNbrAction,
                              common: data.creneauRdvs[0].common,
                              libelle: data.creneauRdvs[0].libelle,
                              compositeId: data.creneauRdvs[0].compositeId,
                              _links: data.creneauRdvs[0]._links,
                            }
                          ],
                          common: data.common,
                        }
                      }

                      if(dataToSend !== null){
                        request('PUT', `/extra/rdv/${data.id}`, dataToSend)
                          .then(response => {
                            dispatch(updateAppointment(response.data));
                            setAppointmentDetails(response.data);
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
                            setEditModal(false);
                            snackbarShowMessage(t('snackBar.sb_succes_save'));

                          })
                          .catch(error => {
                            console.log(JSON.stringify(error));
                            snackbarShowMessage(t('snackBar.sb_error'));
                          });
                      }

                    }
                    else {
                      setErrorMsgTeacher(t('login.required_field'));
                    }

                    /*
                    if(data.meetingStatus === "WAIT") {
                      if (teacherDest !== null) {
                        setErrorMsgTeacher('');
                        const dateDebut = set(date, { hours: getHours(startTime), minutes: getMinutes(startTime) });
                        const dateFin = set(date, { hours: getHours(endTime), minutes: getMinutes(endTime) });

                        const dataToSend = {
                          id: data.id,
                          meetingType: data.meetingType,
                          dateDebut: getTime(dateDebut),
                          dateFin: getTime(dateFin),
                          objet: dataForm.appointmentTitle,
                          details: dataForm.appointmentDescription,
                          classeId: data.classeId,
                          maxInviter: data.maxInviter,
                          dureeMeeting: data.dureeMeeting,
                          deadlineUpdate: data.deadlineUpdate,
                          meetingStatus: data.meetingStatus,
                          totalCreneau: data.totalCreneau,
                          maxEnfantChoice: data.maxEnfantChoice,
                          creneauRdvs: data.creneauRdvs,
                          common: data.common,
                        }

                        request('PUT', `/extra/rdv/${data.id}`, dataToSend)
                          .then(response => {
                            dispatch(updateAppointment(response.data));
                            setAppointmentDetails(response.data);
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
                            setEditModal(false);
                            snackbarShowMessage(t('snackBar.sb_succes_save'));

                          })
                          .catch(error => {
                            console.log(JSON.stringify(error));
                            snackbarShowMessage(t('snackBar.sb_error'));
                          });
                      }
                      else {
                        setErrorMsgTeacher(t('login.required_field'));
                      }
                    }
                    else if(data.meetingStatus === "REPORT"){
                      if (teacherDest !== null) {
                        setErrorMsgTeacher('');
                        const dateDebut = set(date, { hours: getHours(startTime), minutes: getMinutes(startTime) });
                        const dateFin = set(date, { hours: getHours(endTime), minutes: getMinutes(endTime) });

                        const dataToSend = {
                          id: data.id,
                          meetingType: data.meetingType,
                          dateDebut: data.dateDebut,
                          dateFin: data.dateFin,
                          objet: data.objet,
                          details: data.details,
                          classeId: data.classeId,
                          maxInviter: data.maxInviter,
                          dureeMeeting: data.dureeMeeting,
                          deadlineUpdate: data.deadlineUpdate,
                          meetingStatus: data.meetingStatus,
                          totalCreneau: data.totalCreneau,
                          maxEnfantChoice: data.maxEnfantChoice,
                          creneauRdvs: [
                            {
                              id: data.creneauRdvs[0].id,
                              rdvId: data.creneauRdvs[0].rdvId,
                              dateDebut: data.creneauRdvs[0].dateDebut,
                              dateFin: data.creneauRdvs[0].dateFin,
                              totalInviterConfirm: data.creneauRdvs[0].totalInviterConfirm,
                              meetingStatus: data.creneauRdvs[0].meetingStatus,
                              creneauRdvEnfantParents: [
                                {
                                  id: data.creneauRdvs[0].creneauRdvEnfantParents[0].id,
                                  meetingStatus: "REPORT",
                                  creneauRdvId: data.creneauRdvs[0].creneauRdvEnfantParents[0].creneauRdvId,
                                  enfantId: data.creneauRdvs[0].creneauRdvEnfantParents[0].enfantId,
                                  parentId: data.creneauRdvs[0].creneauRdvEnfantParents[0].parentId,
                                  dateDebut: getTime(dateDebut),
                                  dateFin: getTime(dateFin),
                                  commentaire: data.creneauRdvs[0].creneauRdvEnfantParents[0].commentaire,
                                }
                              ],
                              creneauRdvEmployees: data.creneauRdvs[0].creneauRdvEmployees,
                              parentNbrAction: data.creneauRdvs[0].parentNbrAction,
                              employeeNbrAction: data.creneauRdvs[0].employeeNbrAction,
                              common: data.creneauRdvs[0].common,
                              libelle: data.creneauRdvs[0].libelle,
                              compositeId: data.creneauRdvs[0].compositeId,
                              _links: data.creneauRdvs[0]._links,
                            }
                          ],
                          common: data.common,
                        }

                        request('PUT', `/extra/rdv/${data.id}`, dataToSend)
                          .then(response => {
                            dispatch(updateAppointment(response.data));
                            setAppointmentDetails(response.data);
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
                            setEditModal(false);
                            snackbarShowMessage(t('snackBar.sb_succes_save'));

                          })
                          .catch(error => {
                            console.log(JSON.stringify(error));
                            snackbarShowMessage(t('snackBar.sb_error'));
                          });

                      }
                      else {
                        setErrorMsgTeacher(t('login.required_field'));
                      }

                    }
                    */

                  }
                  else if(bntActionStatus === 'CONFIRM') {
                    if (teacherDest !== null) {
                      setErrorMsgTeacher('');
                      const dateDebut = set(date, { hours: getHours(startTime), minutes: getMinutes(startTime) });
                      const dateFin = set(date, { hours: getHours(endTime), minutes: getMinutes(endTime) });
                      let dataToSend:any = null;
                      dataToSend = {
                        id: data.id,
                        meetingType: data.meetingType,
                        dateDebut: data.dateDebut,
                        dateFin: data.dateFin,
                        objet: data.objet,
                        details: data.details,
                        classeId: data.classeId,
                        maxInviter: data.maxInviter,
                        dureeMeeting: data.dureeMeeting,
                        deadlineUpdate: data.deadlineUpdate,
                        meetingStatus: data.meetingStatus,
                        totalCreneau: data.totalCreneau,
                        maxEnfantChoice: data.maxEnfantChoice,
                        personInitor: data.personInitor,
                        creneauRdvs: [
                          {
                            id: data.creneauRdvs[0].id,
                            rdvId: data.creneauRdvs[0].rdvId,
                            dateDebut: data.creneauRdvs[0].dateDebut,
                            dateFin: data.creneauRdvs[0].dateFin,
                            totalInviterConfirm: data.creneauRdvs[0].totalInviterConfirm,
                            meetingStatus: data.creneauRdvs[0].meetingStatus,
                            creneauRdvEnfantParents: [
                              {
                                id: data.creneauRdvs[0].creneauRdvEnfantParents[0].id,
                                meetingStatus: "REPORT",
                                creneauRdvId: data.creneauRdvs[0].creneauRdvEnfantParents[0].creneauRdvId,
                                enfantId: data.creneauRdvs[0].creneauRdvEnfantParents[0].enfantId,
                                parentId: parentId,
                                dateDebut: getTime(dateDebut),
                                dateFin: getTime(dateFin),
                                commentaire: data.creneauRdvs[0].creneauRdvEnfantParents[0].commentaire,
                              }
                            ],
                            creneauRdvEmployees: data.creneauRdvs[0].creneauRdvEmployees,
                            parentNbrAction: data.creneauRdvs[0].parentNbrAction,
                            employeeNbrAction: data.creneauRdvs[0].employeeNbrAction,
                            common: data.creneauRdvs[0].common,
                            libelle: data.creneauRdvs[0].libelle,
                            compositeId: data.creneauRdvs[0].compositeId,
                            _links: data.creneauRdvs[0]._links,
                          }
                        ],
                        common: data.common,
                      }

                      request('PUT', `/extra/rdv/${data.id}`, dataToSend)
                        .then(response => {
                          dispatch(updateAppointment(response.data));
                          setAppointmentDetails(response.data);
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
                          setEditModal(false);
                          snackbarShowMessage(t('snackBar.sb_succes_save'));

                        })
                        .catch(error => {
                          console.log(JSON.stringify(error));
                          snackbarShowMessage(t('snackBar.sb_error'));
                        });
                    }
                    else {
                      setErrorMsgTeacher(t('login.required_field'));
                    }
                  }

                }}
              >
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
                        disabled={!(parentId === data.personInitor)}
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
                        defaultValue={teacherDest}
                      />
                      <Text style={{ ...globalStyles.errorText }}>
                        {errorMsgTeacher}
                      </Text>
                    </View>

                    <View style={styles.inputField}>
                      <Text style={styles.modalInputLabel}>{t("allAppointment.title_field_label")}</Text>
                      <TextInput
                        editable={parentId === data.personInitor}
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
                        editable={parentId === data.personInitor}
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
                      title={t("allAppointment.edit_form")}
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

    </View>
  );
}

function AppointmentDetails({
   navigation,
   route,
   snackbarShowMessage
}: {
  navigation: any,
  route:any,
  snackbarShowMessage:any
}) {
  const {t, i18n} = useTranslation();
  const { data } = route.params;
  const { employees } = useSelector((state: any) => state.employee);
  const { selectedChild } = useSelector((state: any) => state.child);
  const { user } = useSelector((state: any) => state.user);
  const [teacherData, setTeacherData] = useState<any>(null);
  const [appointmentDetails, setAppointmentDetails]  = useState(data);
  //const dayDate:any = toDate(data.dateDebut);
  // const datefin: any = toDate(data.dateFin);
  const dayDate:any = appointmentDetails !== null ? toDate(appointmentDetails.dateDebut) : toDate(data.dateDebut);
  const datefin: any = appointmentDetails !== null ? toDate(appointmentDetails.dateFin) : toDate(data.dateFin);
  const startTime = `${String(getHours(dayDate)).padStart(2, '0')}:${String(getMinutes(dayDate)).padStart(2, '0')}`;
  const endTime = `${String(getHours(datefin)).padStart(2, '0')}:${String(getMinutes(datefin)).padStart(2, '0')}`;
  const [cancelButtom, setCancelButtom] = useState(true);
  const [saveEditButtom, setSaveEditButtom] = useState(false);
  const [dateParent, setDateParent] = useState<any>(null);
  const [timeParent, setTimeParent] = useState<any>(null);
  const [dateEmployee, setDateEmployee] = useState<any>(null);
  const [timeEmployee, setTimeEmployee] = useState<any>(null);
  const parentId:any = user.userDetails.personDetails.person.id;

  const dispatch = useDispatch();

  const handleDeleteRdv = (data:any) => {
    navigation.navigate('Appointment');
    request('DELETE', `/extra/rdv/${data.id}`, {})
      .then(response => {
        dispatch(removeAppointment(data));
        navigation.navigate('Appointment');
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        snackbarShowMessage(t('snackBar.sb_error'));
      });
  }

  useEffect(() => {
    (async () => {

      if(employees.length > 0) {
        if(data.creneauRdvs.length > 0){
          if(data.creneauRdvs[0].creneauRdvEmployees.length > 0){
            const teacherFind = employees.find((teacher:any) => teacher.person.id === data.creneauRdvs[0].creneauRdvEmployees[0].employeeId);
            setTeacherData(teacherFind);

            const creaneauParent:any =  data.creneauRdvs[0].creneauRdvEnfantParents.length > 0 ? data.creneauRdvs[0].creneauRdvEnfantParents[0] : null;
            if(creaneauParent !== null){
              //PARENT
              const dayParent:any = toDate(creaneauParent.dateDebut);
              const dayParentFin:any = toDate(creaneauParent.dateFin);
              const startTimeParent = `${String(getHours(dayParent)).padStart(2, '0')}:${String(getMinutes(dayParent)).padStart(2, '0')}`;
              const endTimeParent = `${String(getHours(dayParentFin)).padStart(2, '0')}:${String(getMinutes(dayParentFin)).padStart(2, '0')}`;
              setDateParent(dayParent);
              setTimeParent(`${startTimeParent} - ${endTimeParent}`);
            }

            const creaneauEmployee:any =  data.creneauRdvs[0].creneauRdvEmployees.length > 0 ? data.creneauRdvs[0].creneauRdvEmployees[0] : null;
            if(creaneauEmployee !== null){
              //PARENT
              const dayEmployee:any = toDate(creaneauEmployee.dateDebut);
              const dayEmployeeFin:any = toDate(creaneauEmployee.dateFin);
              const startTimeEmployee = `${String(getHours(dayEmployee)).padStart(2, '0')}:${String(getMinutes(dayEmployee)).padStart(2, '0')}`;
              const endTimeEmployee = `${String(getHours(dayEmployeeFin)).padStart(2, '0')}:${String(getMinutes(dayEmployeeFin)).padStart(2, '0')}`;
              setDateEmployee(dayEmployee);
              setTimeEmployee(`${startTimeEmployee} - ${endTimeEmployee}`);
            }

          }
        }
      }
    })();
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1,}}>
        <View style={styles.detailsContanier}>
          <View style={styles.appointmentDetails}>
            <View style={styles.appointmentImage}>
              <Image
                source={teacherData !== null && teacherData.person.photo !== "" ? { uri: `${BASEURL_IMG}/${teacherData.person.photo}` } : IMGS.avatar}
                resizeMode="cover"
                style={styles.appointImageCover}
              />
              <View style={{ ...((appointmentDetails.meetingStatus === 'CONFIRM' && styles.validateStatus) ||
                  (appointmentDetails.meetingStatus === 'NOT_RESPECTED' && styles.validateStatus) ||
                  (appointmentDetails.meetingStatus === 'WAIT' && styles.pendingStatus) ||
                  (appointmentDetails.meetingStatus === 'REPORT' && styles.pendingStatus) ||
                  (appointmentDetails.meetingStatus === 'NOT_HELD' && styles.pendingStatus) ||
                  (appointmentDetails.meetingStatus === 'PARTIAL_CONFIRM' && styles.pendingStatus) ||
                  (appointmentDetails.meetingStatus === 'CANCEL' && styles.cancelStatus))
              }} />

              {
                (appointmentDetails.meetingStatus === 'WAIT' ||
                //appointmentDetails.meetingStatus === 'REPORT' ||
                appointmentDetails.meetingStatus === 'NOT_HELD' ||
                appointmentDetails.meetingStatus === 'PARTIAL_CONFIRM' ||
                appointmentDetails.meetingStatus === 'CANCEL'
              ) && appointmentDetails.creneauRdvs[0].employeeNbrAction === 0 &&
                (parentId === data.personInitor) && (
                  <TouchableOpacity onPress={() => handleDeleteRdv(appointmentDetails) } style={{ marginTop:20}}>
                    <MaterialIcons
                      size={22}
                      color={COLORS.red}
                      name="delete"
                    />
                  </TouchableOpacity>
                )}
            </View>

            <View style={styles.appointmentInfoContainer}>
              <Text style={globalStyles.titleH2}>{appointmentDetails.objet}</Text>
              {appointmentDetails.details !== '' && (
                <Text style={{ marginBottom: 5, marginTop:-5, color: COLORS.gray }}>
                  {appointmentDetails.details}
                </Text>
              )}

              <View style={styles.information}>
                <Text style={styles.labelContainer}>{t('allAppointment.employee_field_label')}</Text>
                <Text style={styles.textContainer}>{teacherData !== null ? `${teacherData.person.prenom} ${teacherData.person.nom}` : ''}</Text>
              </View>

              {appointmentDetails.meetingStatus !== 'REPORT' && (
                <>
                  <View style={styles.information}>
                    <Text style={styles.labelContainer}>{t('allAppointment.date_field_label')}</Text>
                    <Text style={{...styles.textContainer, textTransform: "capitalize"}}>
                      {i18n.language == 'en' ?
                        `${format(dayDate, "EEE", { locale: enUS })} ${format(dayDate, "MMMM", { locale: enUS })} ${String(dayDate.getDate()).padStart(2, '0')}, ${format(dayDate, "yyyy", { locale: enUS })}` :
                        `${format(dayDate, "EEE", { locale: fr })} ${String(dayDate.getDate()).padStart(2, '0')} ${format(dayDate, "MMMM", { locale: fr })} ${format(dayDate, "yyyy", { locale: fr })}`
                      }
                    </Text>
                  </View>

                  <View style={styles.information}>
                    <Text style={styles.labelContainer}>{t('allAppointment.startime_field_label')}</Text>
                    <Text style={styles.textContainer}>{startTime}</Text>
                  </View>

                  <View style={styles.information}>
                    <Text style={styles.labelContainer}>{t('allAppointment.endtime_field_label')}</Text>
                    <Text style={styles.textContainer}>{endTime}</Text>
                  </View>

                </>
              )}


              <View style={styles.information}>
                <Text style={styles.labelContainer}>{t('presetAppointment.child')}</Text>
                <Text style={styles.textContainer}>{selectedChild !== null ? `${selectedChild.person.prenom} ${selectedChild.person.nom}`: ''}</Text>
              </View>

              <View style={styles.information}>
                <Text style={styles.labelContainer}>{t('presetAppointment.classroom')}</Text>
                <Text style={styles.textContainer}>{selectedChild !== null  && selectedChild.eleves.length > 0 ? selectedChild.eleves[0].classe.nom : '' }</Text>
              </View>

              { appointmentDetails.meetingStatus === 'REPORT' && (
                <View style={{ marginTop:10}}>
                  <Text style={globalStyles.titleH3}>{t('appointmentDetails.date_proposition')} :</Text>
                  {/*PARENT PROPOSITION*/}
                  <View style={{ ...styles.information, paddingTop:5}}>
                    <View style={styles.labelContainer}>
                      <Text>{t('appointmentDetails.parent')}</Text>
                    </View>
                    <View style={styles.textContainer}>
                      { dateParent !== null && (
                        <Text style={{ textTransform: 'capitalize'}}>
                          {
                            i18n.language == 'en' ?
                              `${format(dateParent, "EEE", { locale: enUS })} ${format(dateParent, "MMMM", { locale: enUS })} ${String(dateParent.getDate()).padStart(2, '0')}, ${format(dateParent, "yyyy", { locale: enUS })}` :
                              `${format(dateParent, "EEE", { locale: fr })} ${String(dateParent.getDate()).padStart(2, '0')} ${format(dateParent, "MMMM", { locale: fr })} ${format(dateParent, "yyyy", { locale: fr })}`
                          }
                        </Text>
                      )
                      }

                      { timeParent !== null && (
                        <Text>{timeParent}</Text>
                      )}

                    </View>
                  </View>

                  {/*TEACHER PROPOSITION*/}
                  <View style={{ ...styles.information, paddingTop:5}}>
                    <View style={styles.labelContainer}>
                      <Text>{t('appointmentDetails.teacher')}</Text>
                    </View>
                    <View style={styles.textContainer}>
                      { dateEmployee !== null && (
                        <Text style={{ textTransform: 'capitalize'}}>
                          {
                            i18n.language == 'en' ?
                              `${format(dateEmployee, "EEE", { locale: enUS })} ${format(dateEmployee, "MMMM", { locale: enUS })} ${String(dateEmployee.getDate()).padStart(2, '0')}, ${format(dateEmployee, "yyyy", { locale: enUS })}` :
                              `${format(dateEmployee, "EEE", { locale: fr })} ${String(dateEmployee.getDate()).padStart(2, '0')} ${format(dateEmployee, "MMMM", { locale: fr })} ${format(dateEmployee, "yyyy", { locale: fr })}`
                          }
                        </Text>
                      )}

                      { timeEmployee !== null && (
                        <Text>{timeEmployee}</Text>
                      )}
                    </View>
                  </View>
                </View>
              )}


            </View>
          </View>

          <ButtonActionStatus
            data={data}
            snackbarShowMessage={snackbarShowMessage}
            setAppointmentDetails={setAppointmentDetails}
            parentId={parentId}
          />

        </View>
      </ScrollView>
    </View>
  );
}

export default withSnackbar(AppointmentDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    //padding:10,
    paddingTop: 15,
    paddingBottom: 20,
  },
  detailsContanier: {
    paddingLeft: 15,
    paddingRight: 15,
    //backgroundColor: 'yellow',
  },
  appointmentDetails: {
    flexDirection: 'row',
  },
  appointmentImage: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: 'green',
  },
  appointImageCover: {
    width: 65,
    height: 65,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  appointmentInfoContainer: {
    flex: 4,
    paddingLeft: 7,
    //backgroundColor: 'red',
  },
  validateStatus: {
    width: 13,
    height: 13,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: COLORS.greenLight,
  },
  pendingStatus: {
    width: 13,
    height: 13,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: COLORS.orange,
  },
  cancelStatus: {
    width: 13,
    height: 13,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: COLORS.red,
  },
  titleDetail: {
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 10,
  },
  information: {
    flexDirection: 'row',
    padding: 0,
    margin: 0,
    marginBottom: 4,
    //backgroundColor: 'red',
  },
  labelContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 2,
  },
  buttomContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  buttom: {
    flex: 1,
    //minWidth: 90,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttomTextLeft: {
    color: COLORS.gray,
    fontWeight: '400',
  },
  buttomTextRight: {
    color: COLORS.white,
    fontWeight: '400',
  },
  cancelButtom: {
    backgroundColor: COLORS.grayVeryLight,
  },
  normalLeftButtom: {
    backgroundColor: COLORS.grayVeryLight,
    borderColor: COLORS.grayLight,
    borderWidth: 1,
  },
  normalRightButtom: {
    backgroundColor: COLORS.primary,
  },
  buttomCancelText: {
    color: COLORS.grayLight,
    fontWeight: '400',
  },

  /*container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: COLORS.white,
  },*/
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
