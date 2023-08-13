import React, { useContext } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/user/userSlice';
import { removeAuthToken } from '../../api/ApiManager';
//import { AuthContext } from '../../context/AuthContext';


export default function Profile() {
  //const { logout, authToken }: any = useContext(AuthContext);
  const dispatch = useDispatch();

  const onLogout = () => {
    removeAuthToken();
    dispatch(logoutUser());
  }

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => onLogout()}>
        <Text>LOG OUT</Text>
        {/* <Text>Log out {authToken}</Text> */}
      </TouchableOpacity>
    </View>
  )
}
