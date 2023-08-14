import React from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { COLORS, IMGS } from "../../constants";
import { globalStyles } from "../../styles/global";
import Card from "../../components/ui/Card";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

export default function MyImsDay() {
  const { t, i18n } = useTranslation();
  
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={IMGS.backgroundImageApp}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.myImsDayContainer}>
          <View style={styles.imsDayHeader}>
            <View style={styles.previousButton}>
              <Pressable>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={16}
                  color={COLORS.gray}
                />
              </Pressable>
            </View>
            <View style={styles.imsDayHeaderTitle}>
              <Text style={globalStyles.title}>{t("myDayAtIms.today")}</Text>
              <Text style={globalStyles.periodMenu}>{t("myDayAtIms.menu_of_day")}</Text>
            </View>
            <View style={styles.nextButton}>
              <Pressable>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color={COLORS.gray}
                />
              </Pressable>
            </View>
          </View>

          <View style={globalStyles.detailsContainer}>
            <Card borderRaduis={10}>
              <View style={globalStyles.imageMenu}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
                  }}
                  resizeMode="cover"
                  style={globalStyles.imageMenuCover}
                />
              </View>
              <View style={globalStyles.infoMenuContainer}>
                <Text style={globalStyles.titleH2}>Poulet</Text>
                <Text style={globalStyles.entreeDish}>
                  Entrée : Salade de crudités (tomate, concombre,mais,
                  ciboulette)
                </Text>
                <Text style={globalStyles.dish}>
                  Plat : Brochettes de Poulet purée
                </Text>
                <Text style={globalStyles.dessert}>Dessert : Fruits</Text>
              </View>
            </Card>
          </View>

          <View style={styles.howIateContainer}>
            <Text style={globalStyles.titleH2}>{t("myDayAtIms.how_i_ate")}</Text>
            <Text style={globalStyles.paragraph}>Très bien</Text>
            <Text
              style={{
                ...globalStyles.titleH3,
                marginTop: 15,
                marginBottom: 7,
              }}
            >
              Observation
            </Text>
            <Text style={globalStyles.paragraph}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever...
            </Text>
          </View>
          
          <View style={styles.napTimeContainer}>
            <View style={styles.imsDayItem}>
                <View style={styles.imsDayItemText}>
                  <Text style={globalStyles.titleH2}>{t("myDayAtIms.nap_time")}</Text>
                  <Text style={globalStyles.paragraph}>{t("myDayAtIms.start_nap_time")} : 12:35 PM</Text>
                  <Text style={globalStyles.paragraph}>{t("myDayAtIms.end_nap_time")} : 12:35 PM</Text>
                </View>

                <View style={styles.imsDayItemImage}>
                  <Image
                    source={IMGS.sleepNatimeImage}
                    resizeMode="cover"
                    style={styles.dayItemImageCover}
                  />
                </View>
              </View>
          </View>

          <View style={styles.bowelContainer}>
            <Text style={globalStyles.titleH2}>{t("myDayAtIms.bowel_movement")}</Text>
            <Text style={globalStyles.paragraph}>Oui</Text>
            <Text
              style={{
                ...globalStyles.titleH3,
                marginTop: 15,
                marginBottom: 7,
              }}
            >
              {t("myDayAtIms.bowel_number_question")}
            </Text>
            <Text style={globalStyles.paragraph}>3 fois</Text>
          </View>

          <View style={styles.injuriesContainer}>
            <Text style={globalStyles.titleH2}>{t("myDayAtIms.injurie_record")}</Text>
            <Text style={globalStyles.paragraph}>Ou : a la catine</Text>
            <Text style={globalStyles.paragraph}>Quand : 15:30</Text>
            <Text
              style={{
                ...globalStyles.titleH3,
                marginTop: 15,
                marginBottom: 7,
              }}
            >
              {t("myDayAtIms.observation")}
            </Text>
            <Text style={globalStyles.paragraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever...
            </Text>
          </View>

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
  myImsDayContainer: {
    paddingTop: 15,
  },
  imsDayHeader: {
    flex: 1,
    flexDirection: "row",
  },
  previousButton: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  imsDayHeaderTitle: {
    flex: 4,
  },
  nextButton: {
    flex: 1,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  howIateContainer: {
    padding: 10,
    paddingTop: 20,
  },
  napTimeContainer:{
    padding: 10,
    paddingTop: 20,

  },
  imsDayItem: {
    flex: 1,
    flexDirection: "row",
    
  },
  imsDayItemText: {
    flex: 3,
    height: 80,
  },
  imsDayItemImage: {
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  dayItemImageCover: {
    width: "100%",
    height: 80,
  },
  bowelContainer:{
    padding: 10,
    paddingTop: 20,
  },
  injuriesContainer:{
    padding: 10,
    paddingTop: 20,
  }

  // title: {
  //   fontSize: 20,
  //   fontWeight: "500",
  //   letterSpacing: 1,
  //   textAlign: "center",
  //   color: COLORS.gray,
  //   marginBottom: 10,
  // },
});
