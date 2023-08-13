import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { COLORS, IMGS, ROUTES } from "../../constants";
import FlatButtom from "../../components/ui/FlatButtom";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import { AuthContext } from "../../context/AuthContext";
import { getAuthToken, removeAuthToken, request, setAuthToken } from "../../api/ApiManager";
import axios from "axios";
import { loginUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

export default function Login({ navigation }: { navigation: any }) {
  //const { login, authToken }: any = useContext(AuthContext);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("eye");
  const dispatch = useDispatch();

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    passwordVisibility ? setPasswordIcon("eye-off") : setPasswordIcon("eye");
  };

  const handleUserLogin = async (data: any) => {
    
    request("POST", "/public/auth/login/parent", {
      username: '0103363697', 
      password: 'ims'
    }).then((response) => {

      dispatch(loginUser(response.data));
      //navigation.navigate('TabNavigator')

    }).catch((error) => {
        console.log(error)
    })
  }

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
            <TextInput
              style={{ ...styles.input, ...styles.marginInput }}
              placeholder="Enter username"
            />
            <View style={{ ...styles.password, ...styles.marginInput }}>
              <TextInput
                style={{ ...styles.inputPassword }}
                secureTextEntry={passwordVisibility}
                placeholder="Enter password"
              />
              <TouchableOpacity
                onPress={() => handlePasswordVisibility()}
                activeOpacity={0.8}
                style={styles.passwordIcon}
              >
                <MaterialCommunityIcons
                  name={passwordIcon}
                  size={22}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            </View>

            {/* navigation.navigate("TabNavigator") */}
            <View style={{ ...styles.buttom, ...styles.marginInput }}>
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
              style={styles.forgetPassword}
            >
              <Text style={styles.forgetPasswordText}>Forget password ? </Text>
            </TouchableOpacity>
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
    alignItems: "flex-end",
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
    alignItems: "center",
  },
  responsiveImage: {
    width: "100%",
    height: 210,
    aspectRatio: 135 / 76,
  },
  formContent: {
    marginTop: 30,
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
    fontSize: 16,
    borderRadius: 8,
  },
  password: {
    flexDirection: "row",
    //width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
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
    alignItems: "center",
    justifyContent: "center",
  },
  forgetPassword: {
    alignItems: "center",
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
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  circle: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  polygonTwo: {
    //flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "red",
  },
});
