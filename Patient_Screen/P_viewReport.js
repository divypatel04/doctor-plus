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
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import { db, storage } from "../database/firebaseDB";
import AsyncStorage from "@react-native-async-storage/async-storage";

const P_viewReport = ({ navigation, route }) => {
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
  const { LabAppID, DocAppID } = route.params;

  function getColumn(obj, str) {
    const temp = Object.entries(obj);
    var i = 0;
    for (i = 0; i < temp.length; i++) {
      if (temp[i][0] == str) {
        return temp[i][1];
      }
    }
  }

  const ds = () => {
    if (LabAppID != "") {
      let l = [];
      const [s, setSS] = useState("");
      db.ref("/Lab_Appointment/" + LabAppID).on("value", (querySnapShot) => {
        l = querySnapShot.val() ? querySnapShot.val() : {};
      });
      storage
        .ref(getColumn(l, "Report"))
        .getDownloadURL()
        .then((url) => {
          //from url you can fetched the uploaded image easily
          setSS(url);
          console.log(s);
        });
      return (
        <View>
          <Image style={styles.ReportImg} source={{ uri: s }} />
        </View>
      );
    }
    if (DocAppID != "") {
      let l = [];
      const [s, setSS] = useState("");
      db.ref("/Doc_Appointment/" + DocAppID).on("value", (querySnapShot) => {
        l = querySnapShot.val() ? querySnapShot.val() : {};
      });
      console.log(l);
      storage
        .ref(getColumn(l, "Report"))
        .getDownloadURL()
        .then((url) => {
          //from url you can fetched the uploaded image easily
          setSS(url);
          console.log(s);
        });
      return (
        <View>
          <Image style={styles.ReportImg} source={{ uri: s }} />
        </View>
      );
    }
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
          <Text style={styles.Logintext}>Report</Text>
        </View>
        {ds()}
      </View>
    </ScrollView>
  );
};

export default P_viewReport;

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
  ReportImg: {
    height: "80%",
    width: "100%",
    resizeMode: "center",
  },
});
