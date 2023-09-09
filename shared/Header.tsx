import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS, IMGS} from '../src/constants';
import {useSelector} from 'react-redux';
import {BASEURL_IMG} from '../src/api/appUrl';

function Header({navigation, title}: {navigation: any; title: any}) {
  const {selectedChild} = useSelector((state: any) => state.child);
  const [childrenSelected, setChildrenSelected] = useState<any>(null);
  //const childrenSelected = selectedChild.person;

  //console.log(selectedChild);

  // const {children, selectedChild} = useSelector((state: any) => state.child);
  // const childrenSelected = selectedChild.person;
  // const childrenSelectedClasse = selectedChild.eleves[0].classe.nom;

  const openDrawMenu = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    setChildrenSelected(
      selectedChild !== null ? selectedChild.person : selectedChild,
    );
  }, [selectedChild]);

  return (
    <ImageBackground source={IMGS.headerBackground} style={styles.header}>
      <View style={styles.headerTitle}>
        <Text style={{...styles.headerText}}>{title}</Text>
      </View>

      <Pressable onPress={openDrawMenu} style={styles.avatarContainer}>
        {childrenSelected !== null && (
          <Image
            source={childrenSelected.photo !== "" ? { uri: `${BASEURL_IMG}/${childrenSelected.photo}` } : IMGS.avatar}
            style={styles.avatar}
          />
        )}
      </Pressable>
    </ImageBackground>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 65,
    //paddingTop: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
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
    position: 'absolute',
    right: 20,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    position: 'absolute',
    right: 20,
    paddingTop: 0,
  },
  avatar: {
    width: 35,
    height: 35,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
});
