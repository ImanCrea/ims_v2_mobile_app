import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = 'http://5.39.81.217:8080/api/v1';
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = async() => {
    let userToken = await AsyncStorage.getItem('authToken');
    //console.log(userToken)
    return userToken;
}

export const setAuthToken = (token: string) => {
    //console.log(token);
    AsyncStorage.setItem('authToken', token);
}

export const removeAuthToken = () => {
    AsyncStorage.removeItem('authToken');
}


export const request = async (method: any, url: any, data: any) => {
    //let headers = {"Content-Type": "multipart/form-data"};
    let headers = {};
    const token = await getAuthToken();
    if (token !== null) {
        headers = {...headers, ...{"Authorization": `Bearer ${token}`} }
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data,
    });
}