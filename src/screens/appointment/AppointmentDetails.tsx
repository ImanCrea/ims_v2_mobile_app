import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants';
import {globalStyles} from '../../styles/global';
import FlatButtom from '../../components/ui/FlatButtom';
import {useTranslation} from 'react-i18next';

export default function AppointmentDetails({navigation}: {navigation: any}) {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.detailsContanier}>
        <View style={styles.appointmentDetails}>
          <View style={styles.appointmentImage}>
            <Image
              source={{
                uri: 'https://ivorymontessorisystem.com/media/upload/photo/Nicole.png',
              }}
              resizeMode="cover"
              style={styles.appointImageCover}
            />
            <View style={styles.validateStatus} />
          </View>

          <View style={styles.appointmentInfoContainer}>
            <Text style={globalStyles.titleH2}>
              Rencontre bilan de l’enfant
            </Text>
            <View style={styles.information}>
              <Text style={styles.labelContainer}>Teacher</Text>
              <Text style={styles.textContainer}>Ange KOFFI</Text>
            </View>

            <View style={styles.information}>
              <Text style={styles.labelContainer}>Date</Text>
              <Text style={styles.textContainer}>Aujourd'hui</Text>
            </View>

            <View style={styles.information}>
              <Text style={styles.labelContainer}>Start time</Text>
              <Text style={styles.textContainer}>10:00 AM</Text>
            </View>

            <View style={styles.information}>
              <Text style={styles.labelContainer}>End time</Text>
              <Text style={styles.textContainer}>10:00 AM</Text>
            </View>

            <View style={styles.information}>
              <Text style={styles.labelContainer}>Child</Text>
              <Text style={styles.textContainer}>Ana OLAYE</Text>
            </View>

            <View style={styles.information}>
              <Text style={styles.labelContainer}>Classroom</Text>
              <Text style={styles.textContainer}>Accajoo</Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 50, marginBottom: 10}}>
          <FlatButtom
            title={t('appointmentDetails.edit_btn')}
            fontWeight="400"
            fontSize={16}
            backgroundColor={COLORS.secondary}
            paddingVertical={12}
            borderRadius={20}
            onPress={() => {}} //navigation.navigate('MyImsDay')
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    //padding:10,
    paddingTop: 15,
    paddingBottom: 20,
  },
  detailsContanier: {
    paddingLeft: 15,
    paddingRight: 15,
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
    paddingLeft: 7,
    //backgroundColor: 'red',
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
  },
  textContainer: {
    flex: 2,
  },
});
