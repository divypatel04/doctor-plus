import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
// import { DatePicker } from "react-native-datepicker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, storage } from "../database/firebaseDB";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const D_addReport = ({ navigation, route }) => {
  const { DocAppID } = route.params;

  const [Doctor_id, setDoctor_id] = useState("");
  AsyncStorage.getItem("Doctor_Session").then((value) => setDoctor_id(value));
  console.log(Doctor_id);
  if (Doctor_id == null) {
    navigation.navigate("Login");
    ToastAndroid.showWithGravity(
      "You are not Login",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  }

  const [pickedImagePath, setPickedImagePath] = useState("");
  const [filename, setFileName] = useState("");
  const [ReportFile, setReportFile] = useState("");

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    if (!result.cancelled) {
      //const img = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      setPickedImagePath(result.uri);
      setFileName(result.uri.substring(result.uri.lastIndexOf("/") + 1));
      // const res = await str
      //   .ref(`images/${filename}`)
      //   .putFile(filepath, metaData);
      setReportFile(result.uri);
    }
  };
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      // const img = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      setPickedImagePath(result.uri);
      setFileName(result.uri.substring(result.uri.lastIndexOf("/") + 1));
      setReportFile(result.uri);
    }
  };

  const [Error, setError] = useState("");

  const submitted = async () => {
    if (ReportFile == "") {
      setError("Add Report File");
    }
    if (ReportFile != "") {
      console.log("why");
      // const id = db.ref("/Lab_Report/").push().getKey();

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", ReportFile, true);
        xhr.send(null);
      });

      let pat = `/Reports/${filename}.jpg`;
      const res = storage.ref(pat).put(blob);
      res.on("state_changed", (snapshot) => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      try {
        await res;
      } catch (e) {
        console.error(e);
      }

      let PatientData = [];
      const PD = [];
      db.ref("/Doc_Appointment/" + DocAppID).on("value", (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        PatientData = { ...data };
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

      db.ref("/Doc_Appointment/")
        .child(DocAppID)
        .set({
          Blood_Pressure: getColumn(PatientData, "Blood_Pressure"),
          D_id: getColumn(PatientData, "D_id"),
          DocApp_id: getColumn(PatientData, "DocApp_id"),
          P_id: getColumn(PatientData, "P_id"),
          Patient_Desc: getColumn(PatientData, "Patient_Desc"),
          Status: "Completed",
          Pulse: getColumn(PatientData, "Pulse"),
          Sugar: getColumn(PatientData, "Sugar"),
          Temperature: getColumn(PatientData, "Temperature"),
          Time: getColumn(PatientData, "Time"),
          Report: pat,
        })
        .catch((e) => setError(e));

      ToastAndroid.showWithGravity(
        "Added Successfully",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      navigation.navigate("Doctor_Home");
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
        </View>
        <View style={styles.section2}>
          {ReportFile !== "" ? (
            <Image source={{ uri: ReportFile }} style={styles.p_icon} />
          ) : (
            <Image
              source={require("../assets/icons/Reports.png")}
              style={styles.p_icon}
            />
          )}
          <View style={styles.ImageButton}>
            <TouchableOpacity style={styles.Select} onPress={showImagePicker}>
              <Text style={styles.LoginButtonText}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Cemera} onPress={openCamera}>
              <Text style={styles.LoginButtonText}>Open Cemera</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section3}>
          <Text style={styles.ErrorText}>{Error}</Text>
          <TouchableOpacity style={styles.LoginButton} onPress={submitted}>
            <Text style={styles.LoginButtonText}>Send Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default D_addReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  header: {
    paddingTop: 70,
    flexDirection: "row",
  },
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
  section2: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  section3: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  section4: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  Input: {
    backgroundColor: "#F7F7F7",
    color: "#525464",
    width: "100%",
    height: 60,
    padding: 16,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontFamily: "Gilroy-Medium",
    fontSize: 16,
    color: "#B0B0C3",
  },
  LoginButton: {
    backgroundColor: "#20C3AF",
    width: "100%",
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
  ortext: {
    fontSize: 16,
    color: "#838391",
    letterSpacing: 0.4,
    alignSelf: "center",
    fontFamily: "Gilroy-SemiBold",
    paddingTop: 30,
  },
  registertext: {
    fontSize: 16,
    color: "#838391",
    letterSpacing: 0.4,
    alignSelf: "center",
    fontFamily: "Gilroy-SemiBold",
    paddingVertical: 16,
  },
  registerhere: {
    fontSize: 16,
    color: "#FFB19D",
    letterSpacing: 0.4,
    alignSelf: "center",
    fontFamily: "Gilroy-SemiBold",
    paddingVertical: 16,
  },
  p_icon: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    resizeMode: "center",
  },

  Select: {
    backgroundColor: "#20C3AF",
    width: "49%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  Cemera: {
    backgroundColor: "#20C3AF",
    width: "49%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageButton: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    flexDirection: "row",
  },
  ErrorText: {
    fontSize: 16,
    color: "#ff2626",
    fontWeight: "700",
    fontFamily: "Gilroy-SemiBold",
    letterSpacing: 0.4,
    paddingVertical: 15,
  },
});
