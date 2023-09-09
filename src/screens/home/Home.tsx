import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, IMGS} from '../../constants';
import WeekCalendar from '../../components/ui/WeekCalendar';
import Card from '../../components/ui/Card';
import FlatButtom from '../../components/ui/FlatButtom';
import {globalStyles} from '../../styles/global';
import {useTranslation} from 'react-i18next';
import { getAllAppointmentList, getRequest } from "../../api/ApiManager";
import { setAllAppointmentList } from "../../features/appointment/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import AppointmentItem from "../appointment/AppointmentItem";
import { BASEURL_IMG } from "../../api/appUrl";
import { format, getHours, getMinutes, getTime, set, toDate } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useNavigation } from "@react-navigation/native";

export default function Home({navigation}: {navigation: any}) {
  const [date, setDate] = useState(new Date());
  const {t, i18n} = useTranslation();
  const { upcomingListAppointments, activeAppointmentList } = useSelector((state: any) => state.appointment);
  const { teacherSelected } = useSelector((state: any) => state.employee);
  const [upcomingAppointHome, setUpcomingAppointHome] = useState([]);
  const [menuPLatCanteen, setMenuPLatCanteen] = useState([]);
  const [dataMenuList, setDataMenuList] = useState<any>([]);
  const [weekData, setWeekData] = useState<any>([]);
  const [week, setWeek] = useState<any | ''>('');
  const [workDaysList, setWorkDaysList] = useState<any>([]);
  const [workDaysNameList, setWorkDaysNameList] = useState<any>([]);
  const [dataMenuJourList, setDataMenuJourList] = useState<any>([]);
  const [dayMenuDetails, setDayMenuDetails] = useState<any>([]);

  const handleAppointmentDetails = (data:any) => {
    //navigation.navigate('Appointment_tab', { screen: 'Appointment_details', params:{data:data} });
  }

  const handleMenuDateChange = (date:any) => {
    setDate(date);
    const theDay =  format(date, "EEEE", { locale: fr });
    const today = theDay.toUpperCase();
    let selectedDay = workDaysList.find((workday:any) => workday.jour.toUpperCase() === today);

    if(selectedDay === undefined) {
      selectedDay = workDaysList[0];
    }
    getMenuDayList(dataMenuJourList, selectedDay, week, dataMenuList, menuPLatCanteen);
  }

  const getMenuDayList = (menuJourListPar:any, selectedDay:any, selectedWeek:any, menuListPar:any, menuPLatCanteenPar:any) => {
    const dayListMenuTab:any = [];
    let dayListMenu:any = {};

    const menuJourList = menuJourListPar !== undefined ? menuJourListPar : [];
    for(let i=0; i<menuJourList.length; i++) {
      const dayMenu = menuJourList[i];
      if(dayMenu.jour === selectedDay.jour.toUpperCase() && dayMenu.semaineId === selectedWeek.id){
        const menuCantineJours = dayMenu.menuCantineJours;
        const menuList = menuListPar !== undefined ? menuListPar : [];
        const menuPLatCanteen = menuPLatCanteenPar !== undefined ? menuPLatCanteenPar : [];

        if(menuCantineJours.length > 0) {
          for(let j=0; j < menuCantineJours.length; j++){
            const menuCantine = menuList.filter((menu:any) => menu.id === menuCantineJours[j].menuCantineId);
            if(menuCantine.length > 0) {
              for(let k=0; k < menuCantine.length; k++) {

                dayListMenu = {
                  nom: menuCantine[k].nom,
                  photo: menuCantine[k].photo,
                  //photo: menuCantine[k].photo !== '' ? `${BASEURL_IMG}/${menuCantine[k].photo}` : IMGS.photoMenu,
                }

                const platCantines = menuCantine[k].menuPlatCantines !== undefined ? menuCantine[k].menuPlatCantines : [];
                if(platCantines.length > 0){
                  const entreeFind = menuPLatCanteen.find((entree:any) => entree.id === platCantines[0].platCantineId);
                  const platFind = menuPLatCanteen.find((entree:any) => entree.id === platCantines[1].platCantineId);
                  const dessertFind = menuPLatCanteen.find((entree:any) => entree.id === platCantines[2].platCantineId);

                  dayListMenu = {
                    ...dayListMenu,
                    entree:entreeFind.nom,
                    plat:platFind.nom,
                    dessert:dessertFind.nom,
                    itemMenuCanteenJourId: menuCantineJours[j].id,
                    menuCanteenJourId: dayMenu.id
                  }
                  dayListMenuTab.push(dayListMenu);
                }
              }
            }
          }
        }
      }
    }

    setDayMenuDetails(dayListMenuTab);
  }

  useEffect(() => {
    (async () => {

      const upcomingAppointment:any = [];
      let count = 0;
      if(activeAppointmentList.length > 0){
        for(let i=0; i<activeAppointmentList.length; i++) {
          if(count < 3){
            upcomingAppointment.push(activeAppointmentList[i]);
            count++;
          }
          else {
            break;
          }
        }
        setUpcomingAppointHome(upcomingAppointment);
      }

      // GET PLAT CANTEEN STATER DISH - DISH - DESSERT
      const dishListRequest:any = await getRequest(`/extra/platcantine`);
      const dishRequestList:any = dishListRequest._embedded !== undefined ? dishListRequest._embedded.platCantineDTOModelList : [];
      setMenuPLatCanteen(dishRequestList);

      // GET MENU CANTEEN
      const menuListRequest:any = await getRequest(`/extra/menucantine`);
      const menuCaneenRequest:any = menuListRequest._embedded !== undefined ? menuListRequest._embedded.menuCantineDTOModelList : [];
      setDataMenuList(menuCaneenRequest);

      // GET WEEK LIST
      const weekListRequest:any = await getRequest(`/corebase/semaines`);
      let canteenWeek:any = weekListRequest._embedded !== undefined ? weekListRequest._embedded.semaineDTOModelList : [];
      canteenWeek = canteenWeek.sort(function (a:any, b:any) {
        return a.dateDebut - b.dateDebut;
      });

      //const test2 = format(week.dateDebut, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
      const dataList = canteenWeek.map((week:any) => {
        const locale =  i18n.language == 'en' ? enUS : fr;
        let weekData:any = {};
        weekData.id = week.id;
        weekData.periodId = week.periodeId;
        weekData.nom = week.nom;
        weekData.startPeriod = format(week.dateDebut, "P", { locale: locale });
        weekData.endPeriod = format(week.dateFin, "P", { locale: locale });
        weekData = {...weekData, ...{common: week.common }}
        return weekData;
      });

      setWeekData([...dataList]);

      // GET WORK DAYS LIST
      const daysListRequest:any = await getRequest(`/corebase/workdays`);
      const workDaysListRequest:any = daysListRequest._embedded !== undefined ? daysListRequest._embedded.jourTravailDTOModelList : [];
      const workdaysList = workDaysListRequest.filter((workDay:any) => workDay.ouvrable);
      setWorkDaysList(workdaysList);

      const workDaysNames = workdaysList.map((workDay:any) => {
        return workDay.jour.toLowerCase();
      })
      setWorkDaysNameList(workDaysNames);

      const todayDate = new Date();
      const theDay =  format(todayDate, "EEEE", { locale: fr });
      const today = theDay.toUpperCase();
      let selectedDay = workdaysList.find((workday:any) => workday.jour.toUpperCase() === today);
      if(selectedDay === undefined) {
        selectedDay = workdaysList[0];
      }

      // GET MENU DAY LIST
      const dataMenuJourRequest:any = await getRequest(`/extra/menujour`);
      const menuJourListRequest:any = dataMenuJourRequest._embedded !== undefined ?  dataMenuJourRequest._embedded.menuJourDTOModelList : [];
      const todayDateFormat = set(todayDate, { hours: 0, minutes: 0, seconds:0, milliseconds:0 });
      const todayTimestamp = getTime(todayDateFormat);
      const theWeek:any = canteenWeek.filter((week:any) => {
        if(todayTimestamp >= week.dateDebut && week.dateFin >= todayTimestamp) {
          return week;
        }
      });

      let weekSelected = dataList.length > 0 ? dataList[0] : '';
      if(theWeek.length > 0 && dataList.length > 0) {
        weekSelected = dataList.find((week:any) => week.id === theWeek[0].id)
      }
      setWeek(weekSelected);

      getMenuDayList(menuJourListRequest, selectedDay, weekSelected, menuCaneenRequest, dishRequestList);
      setDataMenuJourList(menuJourListRequest);

    })();
  }, [activeAppointmentList]);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={IMGS.backgroundImageApp}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.imsDay}>
          <Text style={globalStyles.title}>{t('home.my_day_ims')}</Text>
          <View style={styles.imsDayContainer}>
            <Text style={styles.todayImsDay}>Wednesday, 05 juilly 2023</Text>
            <View style={styles.imsDayItem}>
              <View style={styles.imsDayItemText}>
                <Text style={globalStyles.titleH2}>{t('home.nap_time')}</Text>
                <Text style={globalStyles.paragraph}>
                  {t('home.start_nap_time')} : 12:35 PM
                </Text>
                <Text style={globalStyles.paragraph}>
                  {t('home.end_nap_time')} : 12:35 PM
                </Text>
              </View>

              <View style={styles.imsDayItemImage}>
                <Image
                  source={IMGS.sleepNatimeImage}
                  resizeMode="cover"
                  style={styles.dayItemImageCover}
                />
              </View>
            </View>

            <View style={styles.imsDayItem}>
              <View style={styles.imsDayItemText}>
                <Text style={globalStyles.titleH2}>{t('home.how_i_ate')}</Text>
                <Text style={globalStyles.paragraph}>Very well</Text>
              </View>

              <View style={styles.imsDayItemImage}>
                <Image
                  source={IMGS.howIateImage}
                  resizeMode="cover"
                  style={styles.dayItemImageCover}
                />
              </View>
            </View>

            <View style={{marginTop: 10, marginBottom: 10}}>
              <FlatButtom
                title={t('home.more_details')}
                fontWeight="400"
                fontSize={16}
                backgroundColor={COLORS.primary}
                paddingVertical={12}
                borderRadius={20}
                onPress={() => navigation.navigate('MyImsDay')}
              />
            </View>
          </View>
        </View>

        <View style={globalStyles.dayMenuContainer}>
          <Text style={globalStyles.title}>{t('home.menu_of_day')}</Text>
          <WeekCalendar
            date={date}
            onChange={(newDate: any) => handleMenuDateChange(newDate)}
            workDayNameList={workDaysNameList}
          />
          <Text style={globalStyles.periodMenu}>{week !== '' ? week.nom : ''}</Text>
          {dayMenuDetails.length === 0 && (
            <View style={{ marginTop:15 }}>
              <Text style={{ textAlign:'center'}}>{t('home.empty_menu_year')}</Text>
            </View>
          )}
          {dayMenuDetails.length > 0 && dayMenuDetails.map((detailsMenu:any, index:any) => {
              return (
                <View style={globalStyles.detailsContainer} key={index}>
                  <Card borderRaduis={10}>
                    <View style={globalStyles.imageMenu}>
                      <Image
                        source={detailsMenu.photo !== "" ? { uri: `${BASEURL_IMG}/${detailsMenu.photo}` } : IMGS.photoMenu}
                        resizeMode="cover"
                        style={globalStyles.imageMenuCover}
                      />
                    </View>
                    <View style={globalStyles.infoMenuContainer}>
                      <Text style={globalStyles.titleH2}>{detailsMenu.nom}</Text>
                      <Text style={globalStyles.entreeDish}>
                        {t('home.starter_dish')} : {detailsMenu.entree}
                      </Text>
                      <Text style={globalStyles.dish}>
                        {t('home.dish')} : {detailsMenu.plat}
                      </Text>
                      <Text style={globalStyles.dessert}>
                        {t('home.dessert')} : {detailsMenu.dessert}
                      </Text>
                    </View>
                  </Card>
                </View>
              )
            }
          )}

        </View>

        <View style={styles.appointment}>
          <Text style={globalStyles.title}>{t('home.incomming_appoint')}</Text>
          {(upcomingAppointHome.length === 0 || false) && (<View><Text style={{flex:1, textAlign:"center"}}>{t('appointment.empty_appointment')}</Text></View>)}
          <ScrollView horizontal={true}>
            <View style={{ ...styles.appointmentContainer}}>
              {upcomingAppointHome.length > 0 && upcomingAppointHome.map((appointment: any) => {
                const dayDate:any = toDate(appointment.dateDebut);
                //const datefin: any = toDate(appointment.dateFin);
                const startTime = `${String(getHours(dayDate)).padStart(2, '0')}:${String(getMinutes(dayDate)).padStart(2, '0')}`;
                //const navigation: any = useNavigation();
                //const endTime = `${String(getHours(datefin)).padStart(2, '0')}:${String(getMinutes(datefin)).padStart(2, '0')}`;
                return (
                  <View style={styles.appointItemContainer} key={appointment.id}>
                    <Card borderRaduis={6}>
                      <TouchableOpacity onPress={() => handleAppointmentDetails(appointment)}>
                        <View style={styles.appointmentItem}>
                          <View style={styles.appointImage}>
                            <Image
                              source={teacherSelected !== null && teacherSelected.person.photo !== "" ? { uri: `${BASEURL_IMG}/${teacherSelected.person.photo}` } : IMGS.avatar}
                              resizeMode="cover"
                              style={styles.appointImageCover}
                            />
                          </View>
                          <Text style={styles.appointItemTitle}>
                            {teacherSelected !== null ? teacherSelected.person.prenom : ''} {teacherSelected !== null ? teacherSelected.person.nom : ''}
                          </Text>
                          <Text style={{...styles.appoint, textTransform:'capitalize'}}>
                            {i18n.language == 'en' ?
                              `${format(dayDate, "MMM", { locale: enUS })} ${String(dayDate.getDate()).padStart(2, '0')}, ${format(dayDate, "yyyy", { locale: enUS })}` :
                              `${String(dayDate.getDate()).padStart(2, '0')} ${format(dayDate, "MMM", { locale: fr })} ${format(dayDate, "yyyy", { locale: fr })}`
                            }
                          </Text>
                          <Text style={styles.appoint}>{startTime}</Text>
                        </View>
                      </TouchableOpacity>
                    </Card>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imsDay: {
    paddingTop: 20,
  },
  imsDayContainer: {
    borderRadius: 10,
    backgroundColor: COLORS.grayVeryLight,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  todayImsDay: {
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 15,
  },
  imsDayItem: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    marginBottom: 15,
  },
  imsDayItemText: {
    flex: 3,
    height: 80,
  },
  imsDayItemImage: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  dayItemImageCover: {
    width: '100%',
    height: 80,
  },
  itemDayTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.gray,
    paddingBottom: 10,
  },
  appointment: {
    flex: 1,
    paddingTop: 20,
  },
  appointmentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 15,
  },
  appointmentItem: {
    width: 130,
    minHeight: 145,
    backgroundColor: COLORS.grayVeryLight,
    padding: 5,
  },
  appointItemContainer: {
    marginRight: 10,
  },
  appointImage: {
    alignItems: 'center',
    overflow: 'hidden',
    padding: 5,
  },
  appointImageCover: {
    width: 65,
    height: 65,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  appointItemTitle: {
    textAlign: 'center',
    fontWeight: '600',
  },
  appoint: {
    textAlign: 'center',
    color: COLORS.gray,
  },
});
