import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, CONSTANT } from '../../constants';
import { globalStyles } from '../../styles/global';
import FlatButtom from '../../components/ui/FlatButtom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import SelectFieldAppointment from '../../components/ui/SelectFieldAppointment';
import { request } from '../../api/ApiManager';
import { withSnackbar } from '../../components/ui/SnackbarHOC';
import { updatePresetAppoint } from '../../features/appointment/appointmentSlice';

function PresetAppointmentDetails({
    navigation,
    route,
    snackbarShowMessage,
}: {
    navigation: any;
    route: any;
    snackbarShowMessage: any;
}) {
    const { t, i18n } = useTranslation();
    const { data } = route.params;
    const language = i18n.language;
    const { children, selectedChild } = useSelector((state: any) => state.child);
    const { user } = useSelector((state: any) => state.user);
    const [creneauxRdvList, setCreneauxRdvList] = useState([]);
    const [creneauSelected, setCreneauSelected] = useState<any>(null);
    const [creneauChoiceDone, setCreneauChoiceDone] = useState<any>(null);
    const [cancelButtom, setCancelButtom] = useState(true);
    const [saveEditButtom, setSaveEditButtom] = useState(false);
    const dispatch = useDispatch();
    const [deadlineMeeting, setDeadlineMeeting] = useState(false);

    const handleUserSelectChange = (item: any, index: number) => {
        setCreneauSelected(item);
    };

    const handleCreneauSelectionSubmit = () => {

        if (creneauSelected !== null) {

            const dataToSend = {
                id: creneauSelected.id,
                rdvId: creneauSelected.rdvId,
                dateDebut: creneauSelected.dateDebut,
                dateFin: creneauSelected.dateFin,
                totalInviterConfirm: creneauSelected.totalInviterConfirm,
                meetingStatus: creneauSelected.meetingStatus,
                creneauRdvEmployees: [],
                creneauRdvEnfantParents: [
                    {
                        //id: 0,
                        meetingStatus: 'CONFIRM',
                        creneauRdvId: creneauSelected.id,
                        enfantId: selectedChild.person.id,
                        parentId: user.userDetails.personDetails.person.id,
                        dateDebut: creneauSelected.dateDebut,
                        dateFin: creneauSelected.dateFin,
                        common: CONSTANT.common,
                        commentaire: '',
                    },
                ],
                common: creneauSelected.common,
            };

            //console.log(JSON.stringify(dataToSend));

            request(
                'PUT',
                `/extra/creneaurdv/presets/parent/choices/${selectedChild.person.id}`,
                dataToSend,
            )
                .then(response => {
                    setCreneauSelected(response.data);
                    dispatch(updatePresetAppoint({ rdvId: data.id, creneauRdvData: response.data }));

                    snackbarShowMessage(t('snackBar.sb_succes_save'));
                    //navigation.navigate('Appointment');
                })
                .catch(error => {
                    // Error message
                    console.log(error);
                    snackbarShowMessage(t('snackBar.sb_error'));
                });

        }
    };

    const handleCreneauChoiceDoneSubmit = () => {
        if (creneauChoiceDone !== null) {
            const dataToSend = {
                id: creneauChoiceDone.id,
                rdvId: creneauChoiceDone.rdvId,
                dateDebut: creneauChoiceDone.dateDebut,
                dateFin: creneauChoiceDone.dateFin,
                totalInviterConfirm: creneauChoiceDone.totalInviterConfirm,
                meetingStatus: creneauChoiceDone.meetingStatus,
                creneauRdvEmployees: [],
                creneauRdvEnfantParents: [
                    {
                        id: creneauChoiceDone.creneauRdvEnfantParents[0].id,
                        meetingStatus: 'CANCEL',
                        creneauRdvId: creneauChoiceDone.creneauRdvEnfantParents[0].creneauRdvId,
                        enfantId: selectedChild.person.id,
                        parentId: user.userDetails.personDetails.person.id,
                        dateDebut: creneauChoiceDone.creneauRdvEnfantParents[0].dateDebut,
                        dateFin: creneauChoiceDone.creneauRdvEnfantParents[0].dateFin,
                        common: creneauChoiceDone.creneauRdvEnfantParents[0].common,
                        commentaire: creneauChoiceDone.creneauRdvEnfantParents[0].commentaire,
                    },
                ],
                common: creneauChoiceDone.common,
            };

            console.log(JSON.stringify(dataToSend));

            request(
                'PUT',
                `/extra/creneaurdv/presets/parent/choices/${selectedChild.person.id}`,
                dataToSend,
            )
                .then(response => {
                    snackbarShowMessage(t('snackBar.sb_cancel'));
                    dispatch(updatePresetAppoint({ rdvId: data.id, creneauRdvData: response.data }));
                    //navigation.navigate('Appointment');
                })
                .catch(error => {
                    // Error message
                    console.log(error);
                    snackbarShowMessage(t('snackBar.sb_error'));
                });
        }
    }

    useEffect(() => {
        (async () => {

            let creneauRdvRequest: any = data.creneauRdvs;
            //console.log(JSON.stringify(creneauRdvRequest));
            // creneauRdvRequest = creneauRdvRequest.sort(function (a: any, b: any) {
            //     return a.dateDebut - b.dateDebut;
            // });

            //console.log(JSON.stringify(selectedChild))
            if (creneauRdvRequest.length > 0) {
                const creneauRdvListRequest = creneauRdvRequest.map((creneau: any) => {

                    const creneauRdvEnfantParents = creneau.creneauRdvEnfantParents;
                    if (creneauRdvEnfantParents.length > 0) {

                        if (creneauRdvEnfantParents[0].enfantId === selectedChild.person.id && creneauRdvEnfantParents[0].parentId === user.userDetails.personDetails.person.id) {

                            setCancelButtom(true);
                            setSaveEditButtom(false);
                            if (creneauRdvEnfantParents[0].meetingStatus === 'CONFIRM') {
                                setCancelButtom(false);
                                setSaveEditButtom(true);
                            }
                            setCreneauChoiceDone(creneau);
                        }
                    }

                    let creneauRdvData: any = {};
                    const dateRdvCreneau = format(creneau.dateDebut, 'dd MMMM yyyy', {
                        locale: language === 'en' ? enUS : fr,
                    });
                    const startTime = format(creneau.dateDebut, 'p', {
                        locale: language === 'en' ? enUS : fr,
                    });
                    const endTime = format(creneau.dateFin, 'p', {
                        locale: language === 'en' ? enUS : fr,
                    });
                    creneauRdvData = {
                        dateAppointmentSlot: dateRdvCreneau,
                        startTimeSlot: startTime,
                        endTimeSlot: endTime,
                        ...creneau,
                    };

                    return creneauRdvData;
                });

                let creneauRdvAvailable: any = [];
                creneauRdvAvailable = creneauRdvListRequest.filter(
                    (creneau: any) => creneau.meetingStatus === 'WAIT',
                );
                setCreneauxRdvList(creneauRdvAvailable);
            }

            // DEADLINE MEETING
            const dateDebutMeeting = data.dateDebut - data.deadlineUpdate;
            const today = new Date().setHours(0, 0, 0, 0);
            //console.log('deadline : ' +dateDebutMeeting);
            //console.log('today ' + today)
            if(dateDebutMeeting > 0 ){
                if(today < dateDebutMeeting){
                    setDeadlineMeeting(true);
                }
                else {
                    setDeadlineMeeting(false);
                }
            }
        })();
    }, [data]);

    return (
        <View style={styles.container}>
            <View style={styles.detailsContanier}>
                <View>
                    <View style={styles.appointmentDetails}>
                        <View style={styles.appointmentInfoContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <View
                                    style={{
                                        ...((data.meetingStatus === 'CONFIRM' &&
                                            styles.validateStatus) ||
                                            (data.meetingStatus === 'WAIT' && styles.pendingStatus) ||
                                            (data.meetingStatus === 'PARTIAL_CONFIRM' &&
                                                styles.pendingStatus) ||
                                            (data.meetingStatus === 'CANCEL' && styles.cancelStatus)),
                                        marginRight: 10,
                                    }}
                                />
                                <Text style={globalStyles.titleH2}>{data.objet}</Text>
                            </View>

                            {data.details !== '' && (
                                <Text style={{ marginBottom: 5, color: COLORS.gray }}>
                                    {data.details}
                                </Text>
                            )}

                            <View style={styles.information}>
                                <Text style={styles.labelContainer}>
                                    {t('presetAppointment.date_start')}
                                </Text>
                                <Text style={styles.textContainer}>
                                    {format(data.dateDebut, 'dd MMMM yyyy', {
                                        locale: language === 'en' ? enUS : fr,
                                    })}
                                </Text>
                            </View>

                            <View style={styles.information}>
                                <Text style={styles.labelContainer}>
                                    {t('presetAppointment.date_end')}
                                </Text>
                                <Text style={styles.textContainer}>
                                    {format(data.dateFin, 'dd MMMM yyyy', {
                                        locale: language === 'en' ? enUS : fr,
                                    })}
                                </Text>
                            </View>

                            <View style={styles.information}>
                                <Text style={styles.labelContainer}>
                                    {t('presetAppointment.child')}
                                </Text>
                                <Text style={styles.textContainer}>
                                    {selectedChild.person.prenom} {selectedChild.person.nom}
                                </Text>
                            </View>

                            <View style={styles.information}>
                                <Text style={styles.labelContainer}>
                                    {t('presetAppointment.classroom')}
                                </Text>
                                <Text style={styles.textContainer}>{selectedChild.eleves.length > 0 ? selectedChild.eleves[0].classe.nom : "" }</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.creneauxRdv}>
                    <ScrollView style={styles.creneauxRdvScroll}>
                    {deadlineMeeting ? (
                      <View style={styles.containerCreneauxRdv}>
                              <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
                                  {t('presetAppointment.time_availbale')}
                              </Text>
                              <SelectFieldAppointment
                                data={creneauxRdvList}
                                value={'llll'}
                                placeholder={t('presetAppointment.label_time_slot')}
                                disabled={creneauxRdvList.length <= 0}
                                onSelect={(item: any, index: number) =>
                                  handleUserSelectChange(item, index)
                                }
                              />

                              <View style={{ marginTop: 30, marginBottom: 10 }}>
                                  <View style={styles.buttomContainer}>
                                      <View style={{ flex: 1, paddingRight: 10 }}>
                                          <TouchableOpacity
                                            style={cancelButtom ? { ...styles.buttom, ...styles.cancelButtom } :
                                              { ...styles.buttom, ...styles.normalLeftButtom }
                                            }
                                            disabled={cancelButtom}
                                            onPress={() => handleCreneauChoiceDoneSubmit()}
                                          >
                                              <Text style={cancelButtom ? styles.buttomCancelText : styles.buttomTextLeft}>
                                                  {t('upcomingAppointment.cancel_btn')}
                                              </Text>
                                          </TouchableOpacity>
                                      </View>
                                      <View style={{ flex: 1, paddingLeft: 10, }}>
                                          <TouchableOpacity
                                            style={saveEditButtom ? { ...styles.buttom, ...styles.cancelButtom }
                                              : { ...styles.buttom, backgroundColor: COLORS.primary }}
                                            onPress={() => handleCreneauSelectionSubmit()}
                                            disabled={saveEditButtom}
                                          >
                                              <Text style={saveEditButtom ? styles.buttomCancelText : styles.buttomTextRight}>
                                                  {t('appointmentDetails.save_btn')}
                                              </Text>
                                          </TouchableOpacity>
                                      </View>
                                  </View>

                              </View>
                          </View>
                    ) : (
                      <View style={styles.containerCreneauxRdv}>
                          <Text style={{ textAlign:"justify"}}>{t('presetAppointment.no_action_available')}</Text>
                      </View>
                    )}
                    </ScrollView>
                </View>

                {/*{deadlineMeeting ? (
                  <View style={styles.creneauxRdv}>

                  </View>
                ) : (
                  <Text>Aucune action n'est possible actuellement sur le </Text>
                )}*/}

            </View>
        </View>
    );
}

export default withSnackbar(PresetAppointmentDetails);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        //padding:10,
        paddingTop: 15,
        paddingBottom: 20,
    },
    detailsContanier: {
        flex: 1,
        //paddingLeft: 15,
        //paddingRight: 15,
        //backgroundColor: 'yellow',
    },
    appointmentDetails: {
        flexDirection: 'row',
    },
    appointmentImage: {
        flex: 1,
        alignItems: 'center',
        //backgroundColor: 'green',
    },
    appointImageCover: {
        width: 65,
        height: 65,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.grayLight,
    },
    appointmentInfoContainer: {
        flex: 4,
        //paddingLeft: 7,
        paddingLeft: 15,
        paddingRight: 15,
        //backgroundColor: 'red',
    },
    creneauxRdv: {
        flex: 1,
        marginTop: 5,
        //backgroundColor: 'yellow',
    },
    creneauxRdvScroll: {
        flex: 1,
        //backgroundColor: 'red',
    },
    containerCreneauxRdv: {
        //flex: 1,
        //marginTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    validateStatus: {
        width: 13,
        height: 13,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: COLORS.greenLight,
    },
    pendingStatus: {
        width: 13,
        height: 13,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: COLORS.orange,
    },
    cancelStatus: {
        width: 13,
        height: 13,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: COLORS.red,
    },
    titleDetail: {
        fontWeight: '700',
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 10,
        textAlign: 'left',
    },
    information: {
        flexDirection: 'row',
        padding: 0,
        margin: 0,
        marginBottom: 4,
        //backgroundColor: 'red',
    },
    labelContainer: {
        flex: 1,
        color: COLORS.gray,
    },
    textContainer: {
        flex: 2,
        color: COLORS.gray,
    },
    buttomContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    buttom: {
        flex: 1,
        //minWidth: 90,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttomTextLeft: {
        color: COLORS.gray,
        fontWeight: '400',
    },
    buttomTextRight: {
        color: COLORS.white,
        fontWeight: '400',
    },
    appointmentDate: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        height: 75,
        width: 40,
        backgroundColor: COLORS.blueLight,
    },
    cancelButtom: {
        backgroundColor: COLORS.grayVeryLight,
    },
    normalLeftButtom: {
        backgroundColor: COLORS.grayVeryLight,
        borderColor: COLORS.grayLight,
        borderWidth: 1,
    },
    normalRightButtom: {
        backgroundColor: COLORS.primary,
    },
    buttomCancelText: {
        color: COLORS.grayLight,
        fontWeight: '400',
    },
});
