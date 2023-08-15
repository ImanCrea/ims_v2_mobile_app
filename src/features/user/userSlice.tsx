import {createSlice} from '@reduxjs/toolkit';
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from '../../api/ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserChildren} from '../child/childSlice';
import {useDispatch} from 'react-redux';

const initialState = {
  user: [],
  isLoggedIn: false,
  isLoading: false,
  userToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      setAuthToken(action.payload.token);
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.userToken = action.payload.token;
    },
    logoutUser: state => {
      removeAuthToken();
      return initialState;
    },
  },
});

export const {loginUser, logoutUser} = userSlice.actions;

export default userSlice.reducer;
