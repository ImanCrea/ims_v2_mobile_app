import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppNavigator from './AppNavigator';
import TabNavigator from './TabNavigator';
import {COLORS, ROUTES} from '../constants';
import ProfilStack from '../routes/ProfilStack';
import SettingsStack from '../routes/SettingsStack';
import {useDispatch, useSelector} from 'react-redux';
import {BASEURL_IMG} from '../api/appUrl';
import {changeChild} from '../features/child/childSlice';
import {DrawerActions} from '@react-navigation/native';

function DrawerHeaderContent(props: any) {
  const {navigation} = props;
  const {children, selectedChild} = useSelector((state: any) => state.child);
  const [childrenData, setChildrenData] = useState<any>([]);
  const [childrenSelected, setChildrenSelected] = useState<any>(null);
  const [childrenSelectedClass, setChildrenSelectedClass] = useState<any>(null);
  const [childList, setChildList] = useState(false);
  const dispatch = useDispatch();

  const handleIconChange = (child: any) => {
    setChildList(!childList);
  };

  const handleChangeChild = (childSelected: any) => {
    const findChild = children.filter(
      (child: any) => child.id === childSelected.id,
    );
    dispatch(changeChild(findChild[0]));
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  useEffect(() => {
    if (children.length > 0 && selectedChild !== null) {
      const childrenSelected = selectedChild.person;
      const listChildWithoutSelected = children.filter(
        (child: any) => child.id !== childrenSelected.id,
      );
      const sibilings = listChildWithoutSelected.map((item: any) => {
        return {...item.person, classe: item.eleves[0].classe.nom};
      });
      setChildrenData(sibilings);
      setChildrenSelected(selectedChild.person);
      setChildrenSelectedClass(selectedChild.eleves[0].classe.nom);
    } else {
      setChildrenData([]);
    }
  }, [selectedChild]);

  const Item = ({data}: {data: any}) => (
    <TouchableOpacity onPress={() => handleChangeChild(data)} key={data.id}>
      <View style={styles.itemContainer}>
        <View style={styles.itemAvatarContainer}>
          <Image
            source={{
              uri: `${BASEURL_IMG}/${data.photo}`,
            }}
            style={styles.itemAvatar}
          />
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText}>
            {data.prenom} {data.nom}
          </Text>
          <Text style={styles.itemText}>{data.classe}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          {childrenSelected !== null && (
            <Image
              source={{
                uri: `${BASEURL_IMG}/${childrenSelected.photo}`,
              }}
              style={styles.avatar}
            />
          )}
        </View>
        <View style={styles.headerTextContainer}>
          {childrenSelected !== null && (
            <Text style={styles.headerText}>
              {childrenSelected.prenom} {childrenSelected.nom}
            </Text>
          )}
          <Text style={styles.classroom}>{childrenSelectedClass}</Text>
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
          childrenData.length > 1 &&
          childrenData.map((child: any) => (
            <Item key={child.id} data={child} />
          ))}
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
      drawerContent={props => <DrawerHeaderContent {...props} />}>
      <Drawer.Screen
        name="AppNavigator"
        component={AppNavigator}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={TabNavigator}
        options={{
          drawerLabel: 'Home',
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
          drawerActiveTintColor: COLORS.white,
        }}
      />

      <Drawer.Screen
        name="Child profil"
        component={ProfilStack}
        options={{
          drawerLabel: 'Profil',
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
          drawerActiveTintColor: COLORS.white,
        }}
      />

      <Drawer.Screen
        name="SettingsDrawer"
        component={SettingsStack}
        options={{
          drawerLabel: 'Settings',
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
          drawerActiveTintColor: COLORS.white,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
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
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  headerTextContainer: {
    flex: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    flexDirection: 'row',
    marginBottom: 15,
  },
  itemAvatarContainer: {
    flex: 1,
  },
  itemAvatar: {
    width: 35,
    height: 35,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  itemTextContainer: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemText: {
    color: COLORS.gray,
  },
});
