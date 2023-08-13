import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:COLORS.white,
    },
    dayMenuContainer: {
        //flex:1,
        paddingTop: 15,
      },
      title: {
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 1,
        textAlign: "center",
        color: COLORS.gray,
        marginBottom: 10,
      },
      periodMenu: {
        textAlign: "center",
        //color: COLORS.grayLight,
        color: COLORS.secondary,
      },
      detailsContainer: {
        marginTop: 5,
      },
      imageMenu: {
        alignItems: "center",
        overflow: "hidden",
      },
      imageMenuCover: {
        width: "100%",
        height: 210,
        aspectRatio: 135 / 76,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
      infoMenuContainer: {
        padding: 10,
      },
      titleH2: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 1,
        color: COLORS.gray,
        paddingBottom: 10,
      },
      titleH3:{
        fontSize: 14,
        fontWeight: "700",
        letterSpacing: 1,
        color: COLORS.gray,
      },
      entreeDish: {
        color: COLORS.gray,
        marginBottom: 5,
      },
      dish: {
        color: COLORS.gray,
        marginBottom: 5,
      },
      dessert: {
        color: COLORS.gray,
        marginBottom: 5,
      },
      paragraph: {
        color: COLORS.gray,
      },
      // appointmentItem: {
      //   flex: 1,
      //   flexDirection: "row",
      //   padding: 10,
      //   paddingLeft: 0,
      // },
      // appointmentImage: {
      //   flex: 2,
      //   alignItems: "center",
      // },
      // appointImageCover: {
      //   width: 65,
      //   height: 65,
      //   overflow: "hidden",
      //   borderRadius: 50,
      //   borderWidth: 1,
      //   borderColor: COLORS.grayLight,
      // },
      // appointmentDetails: {
      //   flex: 5,
      //   //backgroundColor: "yellow",
      // },
      // dateContainer: {
      //   flex: 1,
      //   alignItems: "flex-end",
      //   //backgroundColor: "green",
      // },
      // validateStatus: {
      //   width: 13,
      //   height: 13,
      //   borderRadius: 10,
      //   marginTop: 5,
      //   backgroundColor: COLORS.greenLight,
      // },
      // pendingStatus: {
      //   width: 13,
      //   height: 13,
      //   borderRadius: 10,
      //   marginTop: 5,
      //   backgroundColor: COLORS.orange,
      // },
      // cancelStatus: {
      //   width: 13,
      //   height: 13,
      //   borderRadius: 10,
      //   marginTop: 5,
      //   backgroundColor: COLORS.red,
      // },
      // titleDetail: {
      //   fontWeight: "700",
      //   fontSize: 14,
      //   color:COLORS.gray
      // },
      // buttomContainer: {
      //   flex: 1,
      //   flexDirection: "row",
      //   marginTop: 5,
      //   alignItems: "center",
      // },
      // buttom: {
      //   minWidth: 90,
      //   borderRadius: 5,
      //   padding: 6,
      //   marginRight: 15,
      //   alignItems: "center",
      //   justifyContent: "center",
      // },
      // buttomTextLeft: {
      //   color: COLORS.gray,
      //   fontWeight: "400",
      // },
      // buttomTextRight: {
      //   color: COLORS.white,
      //   fontWeight: "400",
      // },
      // appointmentDate: {
      //   alignItems: "center",
      //   justifyContent: "center",
      //   borderRadius: 30,
      //   height: 75,
      //   width: 40,
      //   backgroundColor: COLORS.blueLight,
      // },
      // appointmentDateText: {
      //   color: COLORS.gray,
      //   fontSize: 16,
      // },
      // upcomingAppContainer:{
      //   paddingTop: 15,
      // },
      // normalLeftButtom: {
      //   backgroundColor: COLORS.grayVeryLight,
      //   borderColor: COLORS.grayLight,
      //   borderWidth: 1,
      // },
      // cancelButtom: {
      //   backgroundColor: COLORS.grayVeryLight,
      // },
      // normalRightButtom: {
      //   backgroundColor: COLORS.primary,
      // },
      // buttomCancelText: {
      //   color: COLORS.grayLight,
      //   fontWeight: "400",
      // },
});