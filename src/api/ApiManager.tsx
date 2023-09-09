import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// LOCAL CONFIG
axios.defaults.baseURL = 'http://5.39.81.217:8080/api/v1';

// AWS CONFIG
//axios.defaults.baseURL = 'https://ivorymontessorisystem.com:8443/api/v1';


axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getAuthToken = async () => {
  let userToken = await AsyncStorage.getItem('authToken');
  //console.log(userToken)
  return userToken;
};

export const setAuthToken = (token: string) => {
  //console.log(token);
  AsyncStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  AsyncStorage.removeItem('authToken');
};

export const request = async (method: any, url: any, data: any) => {
  //let headers = {"Content-Type": "multipart/form-data"};
  let headers = {};
  const token = await getAuthToken();
  if (token !== null) {
    headers = { ...headers, ...{ Authorization: `Bearer ${token}` } };
  }

  return axios({
    method: method,
    headers: headers,
    url: url,
    data: data,
  });
};

export const uploadFileRequest = async (method: any, url: any, data: any) => {
  //let headers = {};
  let headers = { 'Content-Type': 'multipart/form-data' };
  const token = await getAuthToken();
  if (token !== null) {
    headers = { ...headers, ...{ Authorization: `Bearer ${token}`} };
  }

  return axios({
    method: method,
    headers: headers,
    url: url,
    data: data,
  });
};

export const getRequest = async (url: any) => {
  let headers = {};
  const token = await getAuthToken();

  if (token !== null) {
    headers = { ...headers, ...{ Authorization: `Bearer ${token}`} };
  }
  const config = {
    headers: headers,
  };
  const response = await axios.get(url, config);
  return response.data;
};

export const getAllAppointmentList = (allAppointmentListReq:any, selectedChild:any) => {
  let allRdvListChildSelected:any = [];
  if(allAppointmentListReq.length > 0) {
    for(let i=0; i<allAppointmentListReq.length; i++) {
      const appointment:any = allAppointmentListReq[i];
      if (appointment.meetingType === "PRESET" && appointment.meetingStatus === "CONFIRM") {
        if(appointment.creneauRdvs.length > 0){
          if(appointment.creneauRdvs[0].creneauRdvEnfantParents.length > 0){
            if(appointment.creneauRdvs[0].creneauRdvEnfantParents[0].enfantId === selectedChild.person.id){
              allRdvListChildSelected.push(appointment);
            }
          }
        }
      }
      else if (appointment.meetingType === "NORMAL") {
        if(appointment.creneauRdvs.length > 0){
          if(appointment.creneauRdvs[0].creneauRdvEnfantParents.length > 0){
            if(appointment.creneauRdvs[0].creneauRdvEnfantParents[0].enfantId === selectedChild.person.id){
              allRdvListChildSelected.push(appointment);
            }
          }
        }
      }
    }
  }

  return allRdvListChildSelected.sort(function (a: any, b: any) {
    return a.dateDebut - b.dateDebut;
  });

}
