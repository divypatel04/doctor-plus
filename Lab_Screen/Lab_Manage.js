import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  ToastAndroid,
  AppRegistry,
  InteractionManager,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, storage } from "../database/firebaseDB";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import base64 from "react-native-base64";

const Lab_Manage = ({ navigation }) => {
  const [Lab_id, setLab_id] = useState("");
  AsyncStorage.getItem("Lab_Session").then((value) => setLab_id(value));

  if (Lab_id == null) {
    navigation.navigate("Login");
    ToastAndroid.showWithGravity(
      "You are not Login",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  }

  let PatientData = [];
  const PD = [];
  db.ref("/Lab_Appointment/").on("value", (querySnapShot) => {
    let data = querySnapShot.val() ? querySnapShot.val() : {};
    PatientData = { ...data };
  });
  var temp = Object.entries(PatientData);
  temp.forEach((ele) => {
    PD.push(ele[1]);
  });

  const dlist = () => {
    return PD.map((element) => {
      let time = new Date(element.Time);

      let ps = [];
      db.ref("/Patient/" + element.P_id).on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        ps = { ...data };
      });
      if ((element.Status == "Pending") & (element.L_id == Lab_id)) {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Lab_ManageSingle", {
                LabAppID: element.LabApp_id,
              })
            }
          >
            <View style={styles.List}>
              <View style={styles.text}>
                <Text style={styles.Name}>Patient Name:- {ps.Name}</Text>
                <Text style={styles.Education}>
                  Date:- {time.getDate()}-{time.getMonth() + 1}-
                  {time.getFullYear()}
                </Text>
                <Text style={styles.Education}>
                  Time:- {time.getHours()}:{time.getMinutes()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {/* <Image
                style={styles.backbutton}
                source={require("../assets/icons/back.png")}
              /> */}
            <Icon style={styles.backbutton} name="arrow-back" />
          </TouchableOpacity>
          <Text style={styles.Logintext}>Manage Appointments</Text>
        </View>
        {dlist()}
      </View>
    </ScrollView>
  );
};

export default Lab_Manage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: "#FFFFFF",
  },
  List: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E2E0",
  },
  Name: {
    color: "#525464",
    fontSize: 18,
    fontFamily: "Gilroy-ExtraBold",
    letterSpacing: 0.4,
  },
  text: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  Education: {
    color: "#616173",
    fontSize: 14,
    paddingTop: 4,
    lineHeight: 15,
    opacity: 0.6,
    fontFamily: "Gilroy-Medium",
  },
  header: {
    paddingTop: 70,
    flexDirection: "row",
    paddingBottom: 35,
  },
  backbutton: {},
  logo: {
    width: 238,
    height: 285,
  },
  Logintext: {
    textAlign: "center",
    color: "#525464",
    fontSize: 18,
    height: 24,
    width: "100%",
    fontFamily: "Gilroy-SemiBold",
    alignItems: "center",
    justifyContent: "center",
  },
});
