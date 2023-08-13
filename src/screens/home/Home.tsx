import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { COLORS, IMGS } from "../../constants";
import WeekCalendar from "../../components/ui/WeekCalendar";
import Card from "../../components/ui/Card";
import FlatButtom from "../../components/ui/FlatButtom";
import { globalStyles } from "../../styles/global";

export default function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
          source={IMGS.backgroundImageApp}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={globalStyles.dayMenuContainer}>
            <Text style={globalStyles.title}>Menu of day</Text>
            <WeekCalendar
              date={date}
              onChange={(newDate: any) => setDate(newDate)}
            />
            <Text style={globalStyles.periodMenu}>Semaine 1</Text>
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
          </View>

          <View style={styles.imsDay}>
            <Text style={globalStyles.title}>My day at IMS</Text>
            <View style={styles.imsDayContainer}>
              <Text style={styles.todayImsDay}>Wednesday, 05 juilly 2023</Text>
              <View style={styles.imsDayItem}>
                <View style={styles.imsDayItemText}>
                  <Text style={globalStyles.titleH2}>Nap time</Text>
                  <Text style={globalStyles.paragraph}>Start : 12:35 PM</Text>
                  <Text style={globalStyles.paragraph}>End : 12:35 PM</Text>
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
                  <Text style={globalStyles.titleH2}>How I ate ?</Text>
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

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <FlatButtom
                  title={"More details"}
                  fontWeight="400"
                  fontSize={16}
                  backgroundColor={COLORS.primary}
                  paddingVertical={12}
                  borderRadius={20}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>

          <View style={styles.appointment}>
            <Text style={globalStyles.title}>Incomming Appointment</Text>
            <ScrollView horizontal={true}>
              <View style={styles.appointmentContainer}>
                <View style={styles.appointItemContainer}>
                  <Card borderRaduis={6}>
                    <TouchableOpacity onPress={() => {}}>
                      <View style={styles.appointmentItem}>
                        <View style={styles.appointImage}>
                          <Image
                            source={{
                              uri: "https://images.unsplash.com/photo-1663964619161-ab147c23c71d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
                            }}
                            resizeMode="cover"
                            style={styles.appointImageCover}
                          />
                        </View>
                        <Text style={styles.appointItemTitle}>Diane Yasse</Text>
                        <Text style={styles.appoint}>Today</Text>
                        <Text style={styles.appoint}>12:30</Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                </View>

                <View style={styles.appointItemContainer}>
                  <Card borderRaduis={6}>
                    <TouchableOpacity onPress={() => {}}>
                      <View style={styles.appointmentItem}>
                        <View style={styles.appointImage}>
                          <Image
                            source={{
                              uri: "https://plus.unsplash.com/premium_photo-1664884631934-ba8369b726f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                            }}
                            resizeMode="cover"
                            style={styles.appointImageCover}
                          />
                        </View>
                        <Text style={styles.appointItemTitle}>
                          Michelle Yaka
                        </Text>
                        <Text style={styles.appoint}>Tommorrow</Text>
                        <Text style={styles.appoint}>15:30</Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                </View>

                <View style={styles.appointItemContainer}>
                  <Card borderRaduis={6}>
                    <TouchableOpacity onPress={() => {}}>
                      <View style={styles.appointmentItem}>
                        <View style={styles.appointImage}>
                          <Image
                            source={{
                              uri: "https://images.unsplash.com/photo-1600714741644-7083deeeca4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjkwfHx1c2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
                            }}
                            resizeMode="cover"
                            style={styles.appointImageCover}
                          />
                        </View>
                        <Text style={styles.appointItemTitle}>
                          Diane Kobenan
                        </Text>
                        <Text style={styles.appoint}>20 juillet 2023</Text>
                        <Text style={styles.appoint}>10:30</Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                </View>
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
    textAlign: "center",
    color: COLORS.gray,
    marginBottom: 15,
  },
  imsDayItem: {
    flex: 1,
    flexDirection: "row",
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
    alignItems: "center",
    overflow: "hidden",
  },
  dayItemImageCover: {
    width: "100%",
    height: 80,
  },
  itemDayTitle: {
    fontSize: 16,
    fontWeight: "700",
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
    flexDirection: "row",
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
    alignItems: "center",
    overflow: "hidden",
    padding: 5,
  },
  appointImageCover: {
    width: 65,
    height: 65,
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  appointItemTitle: {
    textAlign: "center",
    fontWeight: "600",
  },
  appoint: {
    textAlign: "center",
    color: COLORS.gray,
  },
});
