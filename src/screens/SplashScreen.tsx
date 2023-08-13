import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../styles/global";
import { IMGS } from "../constants";

export default function SplashScreen() {
  return (
    <View style={globalStyles.container}>
      <View style={styles.content}>
        <Image source={IMGS.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
});
