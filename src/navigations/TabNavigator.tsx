import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import Home from "../screens/home/Home";
import Appointment from "../screens/appointment/Appointment";
import MyImsDay from "../screens/imsday/MyImsDay";
import Message from "../screens/message/Message";
import More from "../screens/home/More";
import { COLORS, IMGS, ROUTES } from "../constants";
import Header from "../../shared/Header";
import MessageStack from "../routes/MessageStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }:{ navigation:any }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.secondary,
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: 6,
          height: 56,
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={Home}
        options={({ navigation }) => {
          return {
            tabBarLabel: `${ROUTES.HOME}`,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={28} />
            ),
            header: () => <Header navigation={navigation} title={ROUTES.HOME} />,
          };
        }}
      />
      <Tab.Screen
        name="MyImsDay"
        component={MyImsDay}
        options={{
          tabBarLabel: "Ma journee a IMS",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-edit-outline"
              color={color}
              size={28}
            />
          ),
          header: () => (
            <Header navigation={navigation} title="Ma journee a IMS" />
          ),
        }}
      />
      <Tab.Screen
        name="Message_tab"
        component={MessageStack}
        options={{
          tabBarLabel: "Message",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" color={color} size={28} />
          ),
          header: () => <Header navigation={navigation} title="Message" />,
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarLabel: "Rendez-vous",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event-note" color={color} size={28} />
          ),
          header: () => <Header navigation={navigation} title="Appointment" />,
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: "Plus",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="more-horiz" color={color} size={28} />
          ),
          header: () => <Header navigation={navigation} title="More" />,
        }}
      />
    </Tab.Navigator>
  );
}
