import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { COLORS } from "../../constants";
import { globalStyles } from "../../styles/global";
import AppointmentItem from "./AppointmentItem";
import appointmentData from "../../../data/appointmentData";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { withSnackbar } from "../../components/ui/SnackbarHOC";

function UpcomingAppointment(props:any) {
  const {snackbarShowMessage} = props;
  const { t, i18n } = useTranslation();
  //const [appointmentStatus, setAppointmentStatus] = useState(1);
  const { todayListAppointments, upcomingListAppointments } = useSelector((state: any) => state.appointment);
  const { children, selectedChild } = useSelector((state: any) => state.child);
  /*const [todayListAppointments, setTodayListAppointments] = useState<any>([]);
  const [upcomingListAppointments, setUpcomingListAppointments] = useState<any>([]);*/


   /*useEffect(() => {
    (async () => {

      if(allAppointmentList.length > 0) {

        //ALL ACTIVE APPOINTMENT
        const today = new Date().setHours(0, 0, 0, 0);
        const allActiveAppointment:any = [];
        for(let i=0; i<allAppointmentList.length; i++) {
          const meetingDay = new Date(allAppointmentList[i].dateDebut).setHours(0, 0, 0, 0);
          if(meetingDay  >= today && allAppointmentList[i].meetingStatus !== "CANCEL"){
            allActiveAppointment.push(allAppointmentList[i]);
          }
        }

        // TODAY APPOINTMENT LIST
        const todayListAppointReq:any = [];
        let number = 0;
        for(let i=0; i<allActiveAppointment.length; i++) {
          const meetingDay = new Date(allActiveAppointment[i].dateDebut).setHours(0, 0, 0, 0);
          if(number < 3){
            if(today === meetingDay){
              todayListAppointReq.push(allActiveAppointment[i]);
              number++;
            }
          }
          else {
            break;
          }
        }
        setTodayListAppointments(todayListAppointReq);

        // UPCOMING APPOINTMENT LIST
        let count = 0;
        const upcomingListAppointReq:any = [];
        const upcomingListAppointFilter = allActiveAppointment.filter((item:any) => !todayListAppointReq.includes(item));
        for(let i=0; i<upcomingListAppointFilter.length; i++) {
          if(count < 3){
            upcomingListAppointReq.push(upcomingListAppointFilter[i]);
            count++;
          }
          else {
            break;
          }
        }
        setUpcomingListAppointments(upcomingListAppointReq);
      }

    })();
  }, [selectedChild, allAppointmentList]);*/


  return (
    <ScrollView style={styles.container}>
      <View style={styles.todayAppointmentContainer}>
        <Text style={{ ...globalStyles.title }}>{t("upcomingAppointment.today")}</Text>
        {todayListAppointments.length > 0 && todayListAppointments.map((appointment: any) => <AppointmentItem key={appointment.id} data={appointment} snackbarShowMessage={snackbarShowMessage} />)}
        {(todayListAppointments.length === 0 || false) && (<View><Text style={{textAlign:"center"}}>{t('appointment.empty_appointment')}</Text></View>)}
      </View>

      <View style={styles.upcomingAppContainer}>
        <Text style={{ ...globalStyles.title }}>{t("upcomingAppointment.upcoming")}</Text>
        {upcomingListAppointments.length > 0 && upcomingListAppointments.map((appointment: any) => <AppointmentItem key={appointment.id} data={appointment} snackbarShowMessage={snackbarShowMessage} />)}
        {(upcomingListAppointments.length === 0 || false) && (<View><Text style={{textAlign:"center"}}>{t('appointment.empty_appointment')}</Text></View>)}
      </View>
    </ScrollView>
  );
}

export default withSnackbar(UpcomingAppointment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
    paddingBottom: 20,
  },
  todayAppointmentContainer: {
    paddingTop: 15,
  },
  upcomingAppContainer: {
    paddingTop: 15,
  },
});
