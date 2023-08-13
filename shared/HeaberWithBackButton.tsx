import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS, IMGS } from "../src/constants";

function HeaberWithBackButton({ navigation, title, backRouteName }:{navigation:any, title:any, backRouteName:any}) {

  return (
    <ImageBackground source={IMGS.headerBackground} style={styles.header}>
      <Pressable style={{marginLeft:15}} onPress={() => navigation.navigate(backRouteName)}>
        <MaterialIcons name="arrow-back" size={26} color={COLORS.gray} /> 
      </Pressable>
      <View style={styles.headerTitle}>
        <Text style={{...styles.headerText}}>{title}</Text>
      </View>
    </ImageBackground>
  );
}

export default HeaberWithBackButton;

const styles = StyleSheet.create({
  header: {
    height: 65,
    //paddingTop: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth:1,
    borderBottomColor:COLORS.gray
  },
  headerText: {
    fontWeight: '500',
    fontSize: 18,
    color: COLORS.secondary,
    letterSpacing: 1,
    paddingLeft: 20,
    paddingRight: 20,
    
  },
  icon: {
    position: "absolute",
    right: 20,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerTitle: {
    //flexDirection: 'row',
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
  },
  avatarContainer: {
    position: "absolute",
    right: 20,
    paddingTop:0,
  },
  avatar: {
    width: 35,
    height: 35,
    overflow: "hidden",
    borderRadius: 50,
    borderWidth:1,
    borderColor: COLORS.grayLight,
  },
});
