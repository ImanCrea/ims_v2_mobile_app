import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import Card from "../../components/ui/Card";
import { COLORS } from "../../constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { globalStyles } from "../../styles/global";

export default function AppointmentItem(props: any) {
  const { data } = props;
  const [appointmentStatus, setAppointmentStatus] = useState(1);
  
  return (
    <Card borderRaduis={8} marginBottom={20}>
      <Pressable onPress={() => {}}>
        <View style={styles.appointmentItem}>
          <TouchableOpacity onPress={() => {}}></TouchableOpacity>
          <View style={styles.appointmentImage}>
            <Image
              source={{
                uri: data.avatar,
              }}
              resizeMode="cover"
              style={styles.appointImageCover}
            />
            <View
              style={
                (data.status === 1 && styles.validateStatus) ||
                (data.status === 2 && styles.pendingStatus) ||
                (data.status === 3 && styles.cancelStatus)
              }
            />
          </View>
          <View style={styles.appointmentDetails}>
            <Text style={styles.titleDetail}>{data.title}</Text>
            <Text style={globalStyles.paragraph}>{data.username}</Text>
            <Text style={globalStyles.paragraph}>
              Time : {data.startime} - {data.endtime}
            </Text>
            <View style={styles.buttomContainer}>
              <TouchableOpacity
                style={
                  data.status === 3
                    ? { ...styles.buttom, ...styles.cancelButtom }
                    : { ...styles.buttom, ...styles.normalLeftButtom }
                }
                disabled={data.status === 3}
              >
                <Text
                  style={
                    data.status === 3
                      ? styles.buttomCancelText
                      : styles.buttomTextLeft
                  }
                >
                  Annuler
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  data.status === 3
                    ? { ...styles.buttom, ...styles.cancelButtom }
                    : {
                        ...styles.buttom,
                        backgroundColor: COLORS.primary,
                      }
                }
                disabled={data.status === 3}
              >
                <Text
                  style={
                    data.status === 3
                      ? styles.buttomCancelText
                      : styles.buttomTextRight
                  }
                >
                  {data.status === 2 ? "Confirmer" : "Reprogrammer"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dateContainer}>
            {data.status !== 3 && (
              <View style={styles.appointmentDate}>
                <Text style={{ ...styles.appointmentDateText }}>
                  {data.day}
                </Text>
                <Text
                  style={{
                    ...styles.appointmentDateText,
                    fontWeight: "700",
                  }}
                >
                  03
                </Text>
              </View>
            )}
            {data.status === 3 && (
              <Pressable>
                <MaterialIcons
                  name="close"
                  size={18}
                  color={COLORS.gray}
                  style={{ textAlign: "right" }}
                />
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  appointmentItem: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    paddingLeft: 0,
  },
  appointmentImage: {
    flex: 2,
    alignItems: "center",
  },
  appointImageCover: {
    width: 65,
    height: 65,
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  appointmentDetails: {
    flex: 5,
  },
  dateContainer: {
    flex: 1,
    alignItems: "flex-end",
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
    fontWeight: "700",
    fontSize: 14,
    color: COLORS.gray,
  },
  buttomContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  buttom: {
    minWidth: 90,
    borderRadius: 5,
    padding: 6,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttomTextLeft: {
    color: COLORS.gray,
    fontWeight: "400",
  },
  buttomTextRight: {
    color: COLORS.white,
    fontWeight: "400",
  },
  appointmentDate: {
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "400",
  },
});
