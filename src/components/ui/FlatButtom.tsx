import React from "react";
import { StyleSheet, TouchableOpacity, View, Button, Text } from "react-native";
import { COLORS } from "../../constants";

export default function FlatButtom({
  title,
  onPress,
  fontWeight,
  fontSize,
  backgroundColor,
  paddingVertical,
  borderRadius
} : {
  title: any;
  onPress: any;
  fontWeight: any;
  fontSize: any;
  backgroundColor: any
  paddingVertical:any,
  borderRadius: any
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.buttom, backgroundColor:backgroundColor, paddingVertical:paddingVertical, borderRadius:borderRadius}}>
        <Text
          style={{
            ...styles.buttomText,
            fontWeight: fontWeight,
            fontSize: fontSize,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttom: {
    borderRadius: 30,
    //paddingVertical: 12,
    paddingHorizontal: 10,
   // backgroundColor: COLORS.secondary,
  },
  buttomText: {
    color: COLORS.white,
    textTransform: "none",
    textAlign: "center",
    letterSpacing:1,
    //fontWeight: "bold",
    //fontSize: 18,
  },
});
