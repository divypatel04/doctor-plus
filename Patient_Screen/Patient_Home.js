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

const Patient_Home = ({ navigation }) => {
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

  function getColumn(obj, str) {
    const temp = Object.entries(obj);
    var i = 0;
    for (i = 0; i < temp.length; i++) {
      if (temp[i][0] == str) {
        return temp[i][1];
      }
    }
  }
  const [t, setT] = useState();
  function getd() {
    db.ref("/Patient/" + Patient_id)
      .once("value")
      .then((snapshot) => {
        setT(getColumn(snapshot.val(), "Name"));
      });
  }
  getd();

  const logout = () => {
    AsyncStorage.removeItem("Patient_Session");
    console.log("logout");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.WelcomeText}>Welcome, {t}</Text>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate("Doctor_List")}>
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/doctor-icon.png")}
            />
            <Text style={styles.homecardText}>Doctors</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Lab_List")}>
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/lab-icon.png")}
            />
            <Text style={styles.homecardText}>Lab Tests</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate("P_Appointment")}>
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/Appointment-icon.png")}
            />
            <Text style={styles.homecardText}>Appointment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("P_Report")}>
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/Reports.png")}
            />
            <Text style={styles.homecardText}>Report</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Patient_Profile")}
        >
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/patient.png")}
            />
            <Text style={styles.homecardText}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/patient.png")}
            />
            <Text style={styles.homecardText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Patient_Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  WelcomeText: {
    paddingTop: 60,
    paddingBottom: 30,
    fontFamily: "Gilroy-Bold",
    fontSize: 26,
    lineHeight: 32,
    paddingHorizontal: 10,
    letterSpacing: 0.4,
  },
  section: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  homecard: {
    width: 160,
    height: 160,
    backgroundColor: "#323440",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,

    shadowColor: "#f3f3f3",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  homecardIcon: {
    width: 65,
    height: 65,
  },
  homecardText: {
    fontSize: 16,
    fontFamily: "Gilroy-SemiBold",
    paddingTop: 10,
    letterSpacing: 0.4,
    color: "#fff",
    textAlign: "center",
  },
});
