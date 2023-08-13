import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLORS, IMGS } from "../src/constants";

function Header({ navigation, title }:{navigation:any, title:any}) {
  const openDrawMenu = () => {
    navigation.openDrawer();
  };

  return (
    <ImageBackground source={IMGS.headerBackground} style={styles.header}>
      <View style={styles.headerTitle}>
        <Text style={{...styles.headerText}}>{title}</Text>
      </View>

      <Pressable onPress={openDrawMenu} style={styles.avatarContainer}>
        <Image source={{uri: 'https://ivorymontessorisystem.com/media/upload/child_222.jpeg'}} style={styles.avatar} />
      </Pressable>
    </ImageBackground>
  );
}

export default Header;

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
