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

const D_SeeAppointments = ({ navigation, route }) => {
  const { DocAppID } = route.params;
  const [Doctor_id, setDoctor_id] = useState("");
  AsyncStorage.getItem("Doctor_Session").then((value) => setDoctor_id(value));

  if (Doctor_id == null) {
    navigation.navigate("Login");
    ToastAndroid.showWithGravity(
      "You are not Login",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  }

  let DAData = [];
  db.ref("/Doc_Appointment/" + DocAppID).on("value", (querySnapShot) => {
    let data = querySnapShot.val() ? querySnapShot.val() : {};
    DAData = { ...data };
  });
  function getColumn(obj, str) {
    const temp = Object.entries(obj);
    var i = 0;
    for (i = 0; i < temp.length; i++) {
      if (temp[i][0] == str) {
        return temp[i][1];
      }
    }
  }
  let PData = [];
  db.ref("/Patient/" + getColumn(DAData, "P_id")).on(
    "value",
    (querySnapShot) => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      PData = { ...data };
    }
  );
  let time = new Date(getColumn(DAData, "Time"));
  const [s, setSS] = useState("");
  storage
    .ref(getColumn(PData, "Profile_img"))
    .getDownloadURL()
    .then((url) => {
      //from url you can fetched the uploaded image easily
      setSS(url);
      console.log(s);
    });

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
        </View>
        <View style={styles.section1}>
          <View style={styles.logocrad}>
            <Image
              style={styles.logo}
              source={require("../assets/icons/doctor-icon.png")}
            />
            <Text style={styles.D_Name}>{PData.Name}</Text>
            <TouchableOpacity>
              <Text style={styles.D_Education}>View Records</Text>
            </TouchableOpacity>

            <Text style={styles.datetime}>
              Date:- {time.getDate()}/{time.getMonth() + 1}/{time.getFullYear()}{" "}
              Time:- {time.getHours()}:{time.getMinutes()}
            </Text>
          </View>
        </View>
        <View style={styles.section2}>
          {/*<TouchableOpacity style={styles.LoginButton}>
              <Text style={styles.LoginButtonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.LoginButton}>
              <Text style={styles.LoginButtonText}>Reject</Text>
            </TouchableOpacity>*/}
          <Text style={styles.StatusText}> Status:- {DAData.Status}</Text>
        </View>

        <View style={styles.section3}>
          <View style={styles.List}>
            <View style={styles.text}>
              <Text style={styles.Name}>Description</Text>
              <Text style={styles.Education}>{DAData.Patient_Desc}</Text>
            </View>
          </View>
          <View style={styles.List}>
            <View style={styles.text}>
              <Text style={styles.Name}>Blood Pressure</Text>
              <Text style={styles.Education}>{DAData.Blood_Pressure}</Text>
            </View>
          </View>
          <View style={styles.List}>
            <View style={styles.text}>
              <Text style={styles.Name}>Pulse</Text>
              <Text style={styles.Education}>{DAData.Pulse}</Text>
            </View>
          </View>
          <View style={styles.List}>
            <View style={styles.text}>
              <Text style={styles.Name}>Sugar Level</Text>
              <Text style={styles.Education}>{DAData.Sugar}</Text>
            </View>
          </View>
          <View style={styles.List}>
            <View style={styles.text}>
              <Text style={styles.Name}>Temperature</Text>
              <Text style={styles.Education}>{DAData.Temperature}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default D_SeeAppointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 70,
    flexDirection: "row",
    paddingBottom: 15,
    paddingHorizontal: 25,
  },
  logocrad: {
    alignItems: "center",
  },
  section1: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 114,
    height: 114,
  },
  section2: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  section3: {
    width: "100%",
    backgroundColor: "#525464",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  LoginButton: {
    backgroundColor: "#20C3AF",
    width: "45%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  LoginButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    letterSpacing: 0.4,
    alignSelf: "center",
    fontFamily: "Gilroy-SemiBold",
  },
  List: {
    width: "100%",
    backgroundColor: "#525464",
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E2E0",
  },
  Name: {
    color: "#838391",
    fontSize: 14,
    fontFamily: "Gilroy-SemiBold",
    letterSpacing: 0.4,
  },
  D_Name: {
    paddingTop: 26,
    paddingBottom: 6,
    color: "#525464",
    fontSize: 24,
    fontFamily: "Gilroy-Medium",
    letterSpacing: 0.4,
  },
  Education: {
    color: "#fff",
    fontSize: 16,
    opacity: 7,
    letterSpacing: 0.4,
    marginTop: 5,
    fontFamily: "Gilroy-Medium",
  },
  D_Education: {
    fontSize: 16,
    color: "#FFB19D",
    letterSpacing: 0.4,
    alignSelf: "center",
    fontFamily: "Gilroy-SemiBold",
    textDecorationLine: "underline",
  },
  text: {
    marginLeft: 15,
    marginVertical: 15,
  },
  datetime: {
    marginTop: 25,
    opacity: 0.5,
  },
  StatusText: {
    height: 60,
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    letterSpacing: 0.4,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Gilroy-SemiBold",
  },
});
