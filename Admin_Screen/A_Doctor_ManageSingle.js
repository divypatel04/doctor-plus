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

const A_Doctor_ManageSingle = ({ navigation, route }) => {
  const { DoctorID } = route.params;

  const [Admin_id, setAdmin_id] = useState("");
  AsyncStorage.getItem("Admin_Session").then((value) => setAdmin_id(value));

  if (Admin_id == null) {
    navigation.navigate("Login");
    ToastAndroid.showWithGravity(
      "You are not Login",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  }

  let DoctorData = [];
  db.ref("/Doctor/" + DoctorID).on("value", (querySnapShot) => {
    let data = querySnapShot.val() ? querySnapShot.val() : {};
    DoctorData = { ...data };
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
  const [s, setSS] = useState("");
  storage
    .ref(getColumn(DoctorData, "Profile_img"))
    .getDownloadURL()
    .then((url) => {
      //from url you can fetched the uploaded image easily
      setSS(url);
      console.log(s);
    });

  const approved = () => {
    db.ref("/Doctor/")
      .child(DoctorID)
      .set({
        About: getColumn(DoctorData, "About"),
        Address: getColumn(DoctorData, "Address"),
        D_id: getColumn(DoctorData, "D_id"),
        Education: getColumn(DoctorData, "Education"),
        Email: getColumn(DoctorData, "Email"),
        Name: getColumn(DoctorData, "Name"),
        Password: getColumn(DoctorData, "Password"),
        Phone_no: getColumn(DoctorData, "Phone_no"),
        Profession: getColumn(DoctorData, "Profession"),
        Profile_img: getColumn(DoctorData, "Profile_img"),
        status: "Approved",
      })
      .catch((e) => setError(e));

    ToastAndroid.showWithGravity(
      "Successfully Approved",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
    navigation.navigate("Admin_Home");
  };
  const rejected = () => {
    db.ref("/Doctor/")
      .child(DoctorID)
      .set({
        About: getColumn(DoctorData, "About"),
        Address: getColumn(DoctorData, "Address"),
        D_id: getColumn(DoctorData, "D_id"),
        Education: getColumn(DoctorData, "Education"),
        Email: getColumn(DoctorData, "Email"),
        Name: getColumn(DoctorData, "Name"),
        Password: getColumn(DoctorData, "Password"),
        Phone_no: getColumn(DoctorData, "Phone_no"),
        Profession: getColumn(DoctorData, "Profession"),
        Profile_img: getColumn(DoctorData, "Profile_img"),
        status: "Rejected",
      })
      .catch((e) => setError(e));

    ToastAndroid.showWithGravity(
      "Successfully Rejected",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
    navigation.navigate("Admin_Home");
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
        </View>
        <View style={styles.section1}>
          <View style={styles.logocrad}>
            <Image
              style={styles.logo}
              source={require("../assets/icons/doctor-icon.png")}
            />
            <Text style={styles.D_Name}>{DoctorData.Name}</Text>
            <Text style={styles.D_Education}>
              {DoctorData.Education} - {DoctorData.Profession}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.section2}>
          <TouchableOpacity style={styles.LoginButton} onPress={approved}>
            <Text style={styles.LoginButtonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.LoginButton} onPress={rejected}>
            <Text style={styles.LoginButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section3}>
          <View style={styles.List}>
            <View style={styles.text}>
              <Text style={styles.Name}>Email</Text>
              <Text style={styles.Education}>{DoctorData.Email}</Text>
            </View>
          </View>
          <View style={styles.List}>
            <View style={styles.text}>
              <Text style={styles.Name}>Phone no</Text>
              <Text style={styles.Education}>{DoctorData.Phone_no}</Text>
            </View>
          </View>
          <View style={styles.List}>
            <View style={styles.text}>
              <Text style={styles.Name}>About</Text>
              <Text style={styles.Education}>{DoctorData.About}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default A_Doctor_ManageSingle;

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
    width: 203,
    height: 196,
    alignItems: "center",
  },
  section1: {
    flex: 1,
    paddingHorizontal: 86,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  logo: {
    width: 114,
    height: 114,
  },
  section3: {
    width: "100%",
    backgroundColor: "#525464",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  LoginButton: {
    backgroundColor: "#20C3AF",
    width: 315,
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
    fontSize: 28,
    fontFamily: "Gilroy-Medium",
    letterSpacing: 0.4,
  },
  Education: {
    color: "#fff",
    fontSize: 16,
    opacity: 7,
    letterSpacing: 0.4,
    fontFamily: "Gilroy-Medium",
  },
  D_Education: {
    color: "#838391",
    letterSpacing: 0.4,
    fontSize: 18,
    fontFamily: "Gilroy-Medium",
  },
  text: {
    marginLeft: 15,
    marginVertical: 15,
  },

  section2: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  section3: {
    width: "100%",
    backgroundColor: "#525464",
    paddingHorizontal: 30,
    flex: 2,
    paddingVertical: 40,
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
});
