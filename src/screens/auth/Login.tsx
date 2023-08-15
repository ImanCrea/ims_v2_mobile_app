import React, {useContext, useState} from 'react';
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
//import { AuthContext } from "../../context/AuthContext";
import {
  getAuthToken,
  removeAuthToken,
  request,
  setAuthToken,
} from '../../api/ApiManager';
import axios from 'axios';
import {loginUser} from '../../features/user/userSlice';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {Formik} from 'formik';
import {getUserChildren} from '../../features/child/childSlice';

const loginFormSchema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(3),
});

export default function Login({navigation}: {navigation: any}) {
  //const { login, authToken }: any = useContext(AuthContext);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    passwordVisibility ? setPasswordIcon('eye-off') : setPasswordIcon('eye');
  };

  const handleUserLogin = async (data: any) => {
    //console.log(data);
    request('POST', '/public/auth/login/parent', {
      username: data.username, //'0103363697'
      password: data.password, //ims
    })
      .then(response => {
        //console.log(response.data);
        //console.log(JSON.stringify(response.data));
        //console.log(response.data.user.userDetails.personDetails);
        dispatch(loginUser(response.data));
        dispatch(getUserChildren(response.data));
      })
      .catch(error => {
        if (error.code === 'ERR_NETWORK') {
          setErrorMessage(t('login.network_error'));
        } else {
          //error.response.data.message
          setErrorMessage(t('login.acces_error'));
        }
        console.log(error);
      });
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
              source={IMGS.logSchoolImage}
              resizeMode="cover"
              style={styles.responsiveImage}
            />
          </View>

          <View style={styles.formContent}>
            <Text
              style={{
                ...globalStyles.errorText,
                ...{textAlign: 'center', marginBottom: 10},
              }}>
              {errorMessage}
            </Text>

            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={loginFormSchema}
              onSubmit={data => {
                //console.log(data);
                handleUserLogin(data);
              }}>
              {formikProps => (
                <>
                  <TextInput
                    style={{...styles.input}}
                    placeholder={t('login.username')}
                    onChangeText={formikProps.handleChange('username')}
                    value={formikProps.values.username}
                    onBlur={formikProps.handleBlur('username')}
                  />
                  <Text
                    style={{...globalStyles.errorText, ...styles.marginInput}}>
                    {formikProps.touched.username &&
                      formikProps.errors.username && (
                        <Text>{t('login.required_field')}</Text>
                      )}
                  </Text>

                  <View style={{...styles.password}}>
                    <TextInput
                      style={{...styles.inputPassword}}
                      secureTextEntry={passwordVisibility}
                      placeholder={t('login.password')}
                      onChangeText={formikProps.handleChange('password')}
                      value={formikProps.values.password}
                      onBlur={formikProps.handleBlur('password')}
                    />
                    <TouchableOpacity
                      onPress={() => handlePasswordVisibility()}
                      activeOpacity={0.8}
                      style={styles.passwordIcon}>
                      <MaterialCommunityIcons
                        name={passwordIcon}
                        size={22}
                        color={COLORS.gray}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{...globalStyles.errorText, ...styles.marginInput}}>
                    {formikProps.touched.password &&
                      formikProps.errors.password && (
                        <Text>{t('login.required_field')}</Text>
                      )}
                  </Text>

                  <View style={{...styles.buttom, ...styles.marginInput}}>
                    <FlatButtom
                      title={t('login.sign_in')}
                      fontWeight="bold"
                      fontSize={16}
                      backgroundColor={COLORS.secondary}
                      onPress={formikProps.handleSubmit}
                      paddingVertical={17}
                      borderRadius={30}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
                    style={styles.forgetPassword}>
                    <Text style={styles.forgetPasswordText}>
                      {t('login.forget_password')}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            {/* <TextInput
              style={{...styles.input, ...styles.marginInput}}
              placeholder={t('login.username')}
            />
            <View style={{...styles.password, ...styles.marginInput}}>
              <TextInput
                style={{...styles.inputPassword}}
                secureTextEntry={passwordVisibility}
                placeholder={t('login.password')}
              />
              <TouchableOpacity
                onPress={() => handlePasswordVisibility()}
                activeOpacity={0.8}
                style={styles.passwordIcon}>
                <MaterialCommunityIcons
                  name={passwordIcon}
                  size={22}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            </View>

            
            <View style={{...styles.buttom, ...styles.marginInput}}>
              <FlatButtom
                title="Sign In"
                fontWeight="bold"
                fontSize={16}
                backgroundColor={COLORS.secondary}
                onPress={handleUserLogin}
                paddingVertical={17}
                borderRadius={30}
              />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
              style={styles.forgetPassword}>
              <Text style={styles.forgetPasswordText}>Forget password ? </Text>
            </TouchableOpacity> */}
          </View>

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
    marginTop: 20,
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
