import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '../navigations/DrawerNavigator';
import { getAllAppointmentList, getRequest } from "../api/ApiManager";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeesTeacher } from '../features/employee/employeeSlice';
import { setAllAppointmentList } from "../features/appointment/appointmentSlice";

export default function AppStack() {
  const Stack = createNativeStackNavigator();
  const { children, selectedChild } = useSelector((state: any) => state.child);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {

      const employeesListRequest: any = await getRequest(`/corebase/employees`);
      const employeesList: any = employeesListRequest._embedded !== undefined ? employeesListRequest._embedded.employeeDTOModelList : [];

      const teacherList: any = [];
      if(selectedChild !== null){
        if(selectedChild.eleves.length > 0) {
          for (let i = 0; i < employeesList.length; i++) {
            const teacherClasses: any = employeesList[i].teacherClasses;
            if (teacherClasses.length > 0) {
              if (teacherClasses[0] !== undefined) {
                if (teacherClasses[0].classeId === selectedChild.eleves[0].classe.id) {
                  teacherList.push(employeesList[i]);
                }
              }
            }
          }
        }
      }
      const teacher = teacherList.length > 0 ? teacherList[0] : null;
      const teachersList = teacherList.length > 0 ? teacherList : [];
      dispatch(getEmployeesTeacher({ employees: employeesList, teacher: teacher, teacherList: teachersList }));

      //*********************//
      //GET APPOINTEMNT LIST
      //********************//
      if(selectedChild !== null){
        if(selectedChild.eleves.length > 0) {
          const allAppointmentRequest: any = await getRequest(`/extra/rdv`);
          const allAppointmentListReq: any = allAppointmentRequest._embedded !== undefined ? allAppointmentRequest._embedded.rdvDTOModelList : [];
          const allRdvListSort = getAllAppointmentList(allAppointmentListReq, selectedChild)
          dispatch(setAllAppointmentList(allRdvListSort));
        }
      }
      else {
        dispatch(setAllAppointmentList([]));
      }

    })();
  }, [selectedChild]);

  return <DrawerNavigator />;
}
