import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { COLORS } from "../../constants";
import { globalStyles } from "../../styles/global";
import AppointmentItem from "./AppointmentItem";
import appointmentData from "../../../data/appointmentData";

export default function UpcomingAppointment() {
  const [appointmentStatus, setAppointmentStatus] = useState(1);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.todayAppointmentContainer}>
        <Text style={{ ...globalStyles.title }}>Today</Text>

        {appointmentData.map((appointment, index) => {
          if (index < 3) {
            return <AppointmentItem key={appointment.id} data={appointment} />;
          }
        })}
      </View>

      <View style={styles.upcomingAppContainer}>
        <Text style={{ ...globalStyles.title }}>A venir</Text>

        {appointmentData.map((appointment, index) => {
          if (index > 2 && index < 5) {
            return <AppointmentItem key={appointment.id} data={appointment} />;
          }
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding:10,
    paddingBottom: 20,
  },
  todayAppointmentContainer: {
    paddingTop: 15,
  },
  upcomingAppContainer: {
    paddingTop: 15,
  },
});
