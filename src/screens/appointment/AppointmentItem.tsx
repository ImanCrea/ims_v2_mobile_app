import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Card from '../../components/ui/Card';
import { COLORS, CONSTANT, IMGS } from "../../constants";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../../styles/global';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { format, getHours, getMinutes, toDate } from 'date-fns';
import { fr, enUS } from "date-fns/locale";
import { useSelector } from 'react-redux';
import { BASEURL_IMG } from '../../api/appUrl';
import { request } from "../../api/ApiManager";

function ButtonActionStatus(props:any) {
  const {data, snackbarShowMessage} = props;
  const {t, i18n} = useTranslation();
  //const [cancelButtom, setCancelButtom] = useState(true);
  //const [saveEditButtom, setSaveEditButtom] = useState(false);
  console.log(snackbarShowMessage);

  const status = data.meetingStatus;
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
      meetingStatus: "CONFIRM",
      totalCreneau: data.totalCreneau,
      maxEnfantChoice: data.maxEnfantChoice,
      creneauRdvs: data.creneauRdvs,
      common: data.common,
    }

    //console.log(JSON.stringify(teacherDest));
    //console.log(JSON.stringify(selectedChild));
    request('PUT', `/extra/rdv/${data.id}`, dataToSend)
      .then(response => {
        //console.log(response.data);
        snackbarShowMessage(t('snackBar.sb_succes_save'));
      })
      .catch(error => {
        //console.log(JSON.stringify(error));
        snackbarShowMessage(t('snackBar.sb_error'));
      });
  }

  const handleRescheduleAppointment = () => {
    console.log('Reprogrammer');
    snackbarShowMessage(t('snackBar.sb_error'));
  }


  return (
    <View style={styles.buttomContainer}>
      <View  style={{ padding: 2}}>
        <TouchableOpacity
          style={
            ((status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "NOT_HELD" ) && { ...styles.buttom, ...styles.normalLeftButtom, padding:8 }) ||
            ((status === "CONFIRM" || status === "NOT_RESPECTED" ) && { ...styles.buttom, ...styles.normalLeftButtom, padding:8 }) ||
            (status === "CANCEL" && { ...styles.buttom, ...styles.cancelButtom, padding:8 })
          }
          disabled={(status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "NOT_HELD" ) && false ||
            (status === "CONFIRM" || status === "NOT_RESPECTED" ) && false ||
             status === "CANCEL" && false}
          onPress={() => {} }
        >
          {(status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "NOT_HELD" ) && (
            <Text style={styles.buttomTextLeft}>
              {t('upcomingAppointment.edit_btn')}
            </Text>
          )}

          {(status === "CONFIRM" || status === "NOT_RESPECTED" ) && (
            <Text style={styles.buttomTextLeft}>
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

      <View style={{ padding: 2,}}>
        <TouchableOpacity
          style={
            ((status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "PARTIAL_HELD" ) && { ...styles.buttom, backgroundColor: COLORS.primary, padding:8 }) ||
            ((status === "CONFIRM" || status === "NOT_RESPECTED" ) && { ...styles.buttom, backgroundColor: COLORS.primary, padding:8 }) ||
            (status === "CANCEL" && { ...styles.buttom, ...styles.cancelButtom, padding:8 })
          }
          onPress={() => ((status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "PARTIAL_HELD" ) && handleConfirmAppointment() ) ||
            ((status === "CONFIRM" || status === "NOT_RESPECTED" ) && handleRescheduleAppointment())}
        >
          {(status === "WAIT" || status === "REPORT" || status === "PARTIAL_CONFIRM" || status === "PARTIAL_HELD" ) && (
            <Text style={styles.buttomTextRight}>
              {t('upcomingAppointment.confirm_btn')}
            </Text>
          )}

          {(status === "CONFIRM" || status === "NOT_RESPECTED" ) && (
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
  );
}

function AppointmentItem(props: any) {
  const { data } = props;
  const { t, i18n } = useTranslation();
  const navigation: any = useNavigation();
  const dayDate:any = toDate(data.dateDebut);
  const datefin: any = toDate(data.dateFin);
  const startTime = `${String(getHours(dayDate)).padStart(2, '0')}:${String(getMinutes(dayDate)).padStart(2, '0')}`;
  const endTime = `${String(getHours(datefin)).padStart(2, '0')}:${String(getMinutes(datefin)).padStart(2, '0')}`;
  const { teacherSelected } = useSelector((state: any) => state.employee);

  return (
    <Card borderRaduis={8} marginBottom={20}>
      <Pressable
        onPress={() => navigation.navigate('Appointment_details', {
            data: data,
          }
        )}
      >
        <View style={styles.appointmentItem}>
          <View style={styles.appointmentImage}>
            <Image
              source={teacherSelected !== null && teacherSelected.person.photo !== "" ? { uri: `${BASEURL_IMG}/${teacherSelected.person.photo}` } : IMGS.avatar}
              resizeMode="cover"
              style={styles.appointImageCover}
            />
            <View
              style={
                (data.meetingStatus === 'CONFIRM' && styles.validateStatus) ||
                (data.meetingStatus === 'NOT_RESPECTED' && styles.validateStatus) ||
                (data.meetingStatus === 'WAIT' && styles.pendingStatus) ||
                (data.meetingStatus === 'REPORT' && styles.pendingStatus) ||
                (data.meetingStatus === 'NOT_HELD' && styles.pendingStatus) ||
                (data.meetingStatus === 'PARTIAL_CONFIRM' && styles.pendingStatus) ||
                (data.meetingStatus === 'CANCEL' && styles.cancelStatus)
              }
            />
          </View>
          <View style={styles.appointmentDetails}>
            <Text style={styles.titleDetail}>{data.objet}</Text>
            <Text style={globalStyles.paragraph}>{teacherSelected !== null ? teacherSelected.person.prenom : ''} {teacherSelected !== null ? teacherSelected.person.nom : ''}</Text>
            <Text style={globalStyles.paragraph}>
              Time : {startTime} - {endTime}
            </Text>
            {/*<ButtonActionStatus data={data} snackbarShowMessage={snackbarShowMessage} />*/}
          </View>

          <View style={styles.dateContainer}>
            {data.meetingStatus !== 3 && (
              <View style={styles.appointmentDate}>
                <Text style={{ ...styles.appointmentDateText, textTransform: "capitalize" }}>
                  {format(dayDate, "EEE", { locale: i18n.language == 'en' ? enUS : fr })}
                </Text>
                <Text
                  style={{
                    ...styles.appointmentDateText,
                    fontWeight: '700',
                  }}>
                  {String(dayDate.getDate()).padStart(2, '0')}
                </Text>
              </View>
            )}
            {data.status === 3 && (
              <Pressable>
                <MaterialIcons
                  name="close"
                  size={18}
                  color={COLORS.gray}
                  style={{ textAlign: 'right' }}
                />
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Card>
  );
}

export default AppointmentItem;

const styles = StyleSheet.create({
  appointmentItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 0,
  },
  appointmentImage: {
    flex: 2,
    alignItems: 'center',
  },
  appointImageCover: {
    width: 65,
    height: 65,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  appointmentDetails: {
    flex: 5,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'flex-end',
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
  },
  buttomContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  buttom: {
    minWidth: 90,
    borderRadius: 5,
    padding: 6,
    marginRight: 15,
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
  appointmentDate: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 75,
    width: 40,
    backgroundColor: COLORS.blueLight,
  },
  appointmentDateText: {
    color: COLORS.gray,
    fontSize: 16,
  },
  normalLeftButtom: {
    backgroundColor: COLORS.grayVeryLight,
    borderColor: COLORS.grayLight,
    borderWidth: 1,
  },
  cancelButtom: {
    backgroundColor: COLORS.grayVeryLight,
  },
  normalRightButtom: {
    backgroundColor: COLORS.primary,
  },
  buttomCancelText: {
    color: COLORS.grayLight,
    fontWeight: '400',
  },
});
