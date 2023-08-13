import { createSlice } from "@reduxjs/toolkit";
import { getAuthToken, removeAuthToken, setAuthToken } from "../../api/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    user: [],
    userDetails: [],
    isLoggedIn: false,
    isLoading: false,
    userToken: null 
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            setAuthToken(action.payload.token);
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.userToken = action.payload.token;
            state.userDetails = action.payload.user.userDetails; 
        },
        logoutUser: (state) => {
            removeAuthToken();
            return initialState;
        },
    }
});

export const { loginUser, logoutUser } = userSlice.actions; 

// export const selectRestaurant = (state) => {
    
//     console.log(state)
// }


export default userSlice.reducer;