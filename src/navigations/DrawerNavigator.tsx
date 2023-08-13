import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppNavigator from "./AppNavigator";
import TabNavigator from "./TabNavigator";
import { COLORS, ROUTES } from "../constants";
import ProfilStack from "../routes/ProfilStack";
import SettingsStack from "../routes/SettingsStack";

const CHILDREN = [
  {
    id: 1,
    firstName: "Ali",
    lastName: "DEKMAK",
    avatar: "https://ivorymontessorisystem.com/media/upload/child_222.jpeg",
  },
  {
    id: 2,
    firstName: "Delia",
    lastName: "NACEUR",
    avatar: "https://ivorymontessorisystem.com/media/upload/child_221.jpeg",
  },
  {
    id: 3,
    firstName: "Evan",
    lastName: "TAFFANEAU",
    avatar: "https://ivorymontessorisystem.com/media/upload/child_70.jpeg",
  },
];

function DrawerHeaderContent(props: any) {
  const [childList, setChildList] = useState(false);
  const handleIconChange = () => {
    setChildList(!childList);
  };

  const Item = ({ data }: { data: any }) => (
    <TouchableOpacity onPress={() => { }} key={data.id}>
      <View style={styles.itemContainer}>
        <View style={styles.itemAvatarContainer}>
          <Image
            source={{
              uri: data.avatar,
            }}
            style={styles.itemAvatar}
          />
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>
            {data.firstName} {data.lastName}
          </Text>
          <Text style={styles.itemText}>Accajoo</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://ivorymontessorisystem.com/media/upload/child_222.jpeg",
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Ali DEKMAK</Text>
          <Text style={styles.classroom}>Accajoo</Text>
        </View>

        <View style={styles.headerIcon}>
          <TouchableOpacity onPress={handleIconChange}>
            {childList ? (
              <MaterialCommunityIcons
                name="chevron-up"
                size={28}
                style={styles.icon}
              />
            ) : (
              <MaterialCommunityIcons
                name="chevron-down"
                size={28}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.childListContainer}>
        {childList &&
          CHILDREN.map((child) => <Item key={child.id} data={child} />)}
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      //useLegacyImplementation
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerHeaderContent {...props} />}
    >
      <Drawer.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={TabNavigator}
        options={{
          drawerLabel: "Home",
          drawerIcon: () => (
            <MaterialIcons name="home" size={24} color={COLORS.gray} />
          ),
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '800',
            color: COLORS.gray,
            marginLeft: -10,
          },
          drawerItemStyle: {
            marginTop: 0,
            marginBottom: 0,
          },
          drawerActiveTintColor: COLORS.secondary,
        }}
      />

      <Drawer.Screen
        name="Child profil"
        component={ProfilStack}
        options={{
          drawerLabel: "Profil",
          drawerIcon: () => (
            <MaterialIcons name="person" size={24} color={COLORS.gray} />
          ),
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '800',
            color: COLORS.gray,
            marginLeft: -10,
          },
          drawerItemStyle: {
            marginTop: 0,
            marginBottom: 0,
          },
          drawerActiveTintColor: COLORS.secondary,
        }}
      />

      <Drawer.Screen
        name="SettingsDrawer"
        component={SettingsStack}
        options={{
          drawerLabel: "Settings",
          drawerIcon: () => (
            <MaterialIcons name="settings" size={24} color={COLORS.gray} />
          ),
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '800',
            color: COLORS.gray,
            marginLeft: -10,
          },
          drawerItemStyle: {
            marginTop: 0,
            marginBottom: 0,
          },
          drawerActiveTintColor: COLORS.secondary,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginTop: 40,
    paddingLeft: 18,
    paddingRight: 20,
  },
  avatarContainer: {
    flex: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  headerTextContainer: {
    flex: 5,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: '700',
    color: COLORS.gray,
  },
  classroom: {
    color: COLORS.gray,
  },
  headerIcon: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  icon: {
    color: COLORS.gray,
  },
  childListContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    marginBottom: 20,
    //borderBottomWidth:1,
    //borderBottomColor: COLORS.grayLight,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 15,
  },
  itemAvatarContainer: {
    flex: 1,
  },
  itemAvatar: {
    width: 35,
    height: 35,
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  itemTextContainer: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  itemText: {
    color: COLORS.gray,
  },
});
