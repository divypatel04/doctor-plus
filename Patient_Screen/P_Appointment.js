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

const P_Appointment = ({ navigation }) => {
  const [Patient_id, setPatient_id] = useState("");
  AsyncStorage.getItem("Patient_Session").then((value) => setPatient_id(value));

  if (Patient_id == null) {
    navigation.navigate("Login");
    ToastAndroid.showWithGravity(
      "You are not Login",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  }

  let DoctorData = [];
  const DD = [];
  db.ref("/Doc_Appointment/").on("value", (querySnapShot) => {
    let data = querySnapShot.val() ? querySnapShot.val() : {};
    DoctorData = { ...data };
  });
  var temp = Object.entries(DoctorData);
  temp.forEach((ele) => {
    DD.push(ele[1]);
  });

  let LabData = [];
  const LabD = [];
  db.ref("/Lab_Appointment/").on("value", (querySnapShot) => {
    let data = querySnapShot.val() ? querySnapShot.val() : {};
    LabData = { ...data };
  });
  var temp = Object.entries(LabData);
  temp.forEach((ele) => {
    LabD.push(ele[1]);
  });

  const dlist = () => {
    return DD.map((element) => {
      let time = new Date(element.Time);

      let dds = [];
      db.ref("/Doctor/" + element.D_id).on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        dds = { ...data };
      });
      console.log(element.Status != "Completed");
      if (
        (element.P_id == Patient_id) &
        (element.Status != "Completed") &
        (element.Status != "Cancelled")
      ) {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("P_AppointmentSee", {
                LabAppID: "",
                DoctorAppID: element.DocApp_id,
              })
            }
          >
            <View style={styles.List}>
              <View style={styles.text}>
                <Text style={styles.Name}>Doctor Name:- {dds.Name}</Text>
                <Text style={styles.Education}>Status:- {element.Status}</Text>
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

  const list = () => {
    return LabD.map((element) => {
      let time = new Date(element.Time);

      let dds = [];
      db.ref("/Lab/" + element.L_id).on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        dds = { ...data };
      });
      if (
        (element.P_id == Patient_id) &
        (element.Status != "Completed") &
        (element.Status != "Cancelled")
      ) {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("P_AppointmentSee", {
                LabAppID: element.LabApp_id,
                DoctorAppID: "",
              })
            }
          >
            <View style={styles.List}>
              <View style={styles.text}>
                <Text style={styles.Name}>Lab Name:- {dds.Name}</Text>
                <Text style={styles.Education}>Status:- {element.Status}</Text>
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
            <Icon style={styles.backbutton} name="arrow-back" />
          </TouchableOpacity>
          <Text style={styles.Logintext}>Appointments</Text>
        </View>

        <View style={styles.sTitle}>
          <Text style={styles.ssTitle}>Doctor's Appointments</Text>
        </View>
        {dlist()}
        <View style={styles.sTitle}>
          <Text style={styles.ssTitle}>Lab's Appointments</Text>
        </View>
        {list()}
      </View>
    </ScrollView>
  );
};

export default P_Appointment;

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
    flexDirection: "row",
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
    width: "100%",
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
  ssTitle: {
    fontSize: 20,
    paddingVertical: 18,
    fontFamily: "Gilroy-SemiBold",
    textAlign: "center",
    color: "#fff",
    letterSpacing: 0.7,
  },
  sTitle: {
    width: "100%",
    backgroundColor: "#323440",
    marginVertical: 10,
  },
});
