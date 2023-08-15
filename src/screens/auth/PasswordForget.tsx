import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {globalStyles} from '../../styles/global';
import {COLORS, IMGS, ROUTES} from '../../constants';
import FlatButtom from '../../components/ui/FlatButtom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

export default function PasswordForget({navigation}: {navigation: any}) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const {t, i18n} = useTranslation();

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    passwordVisibility ? setPasswordIcon('eye-off') : setPasswordIcon('eye');
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.polygonOne}>
        <Image source={IMGS.logPolygonTop} />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.illustration}>
            <Image
              source={IMGS.forgetPassword}
              resizeMode="cover"
              style={styles.responsiveImage}
            />
          </View>

          <View style={styles.formContent}>
            <TextInput
              style={{...styles.input, ...styles.marginInput}}
              placeholder={t('forgetPassword.email')}
            />

            <View style={{...styles.buttom, ...styles.marginInput}}>
              <FlatButtom
                title={t('forgetPassword.send_reset')}
                fontWeight="bold"
                fontSize={16}
                backgroundColor={COLORS.secondary}
                onPress={() => {}}
                paddingVertical={17}
                borderRadius={30}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.LOGIN)}
              style={styles.forgetPassword}>
              <Text style={styles.forgetPasswordText}>
                {t('forgetPassword.sign_in')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 50}}></View>

          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <View style={styles.square}>
                <Image source={IMGS.logSquare} />
              </View>
              <View style={styles.circle}>
                <View style={styles.logo}>
                  <Image
                    source={IMGS.logo}
                    resizeMode="cover"
                    style={styles.resizeLogo}
                  />
                </View>
                <Image source={IMGS.logCircle} />
              </View>
              <View style={styles.polygonTwo}>
                <Image source={IMGS.logPolygonBottom} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  polygonOne: {
    flex: 1,
    alignItems: 'flex-end',
  },
  content: {
    flex: 8,
    padding: 20,
    paddingTop: 0,
  },
  logo: {
    //height: 50,
  },
  resizeLogo: {
    height: 50,
    aspectRatio: 165 / 76,
  },
  illustration: {
    alignItems: 'center',
  },
  responsiveImage: {
    width: '100%',
    height: 180,
    aspectRatio: 135 / 76,
  },
  formContent: {
    marginTop: 30,
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    fontSize: 16,
    borderRadius: 8,
  },
  password: {
    flexDirection: 'row',
    //width: "100%",
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    //backgroundColor: 'red',
  },
  inputPassword: {
    flex: 6,
    //width: "80%",
    fontSize: 16,
    padding: 16,
    //backgroundColor:'green'
  },
  passwordIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgetPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgetPasswordText: {
    fontSize: 16,
  },
  marginInput: {
    marginBottom: 20,
  },
  buttom: {
    marginTop: 25,
  },
  square: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  circle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  polygonTwo: {
    //flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: "red",
  },
});
