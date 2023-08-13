import React from "react";
import { StyleSheet, Text, View, ScrollView, ImageBackground } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, } from "../../constants";
import UpcomingAppointment from './UpcomingAppointment';
import AllAppointment from "./AllAppointment";

const Tab = createMaterialTopTabNavigator();

export default function Appointment() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { 
            fontSize: 14,
            textTransform: 'capitalize',
            letterSpacing:0.6,
            fontWeight: '700'
          },
          tabBarItemStyle: {},
          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderBottomColor: COLORS.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.secondary,
            height: 43,
            margin: 2,
            borderRadius: 8,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: COLORS.grayVeryLight,
            borderRadius: 7,
            paddingRight:12,
          },
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.grayLight
        }}
      >
        <Tab.Screen name="Upcoming" component={UpcomingAppointment} />
        <Tab.Screen name="All Appointment" component={AllAppointment} />
      </Tab.Navigator>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: COLORS.white,
    //padding:10,
    paddingTop:15,
    paddingBottom: 20,
  },
})
