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
  TextInput,
  InteractionManager,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, storage } from "../database/firebaseDB";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import base64 from "react-native-base64";
import DateTimePicker from "@react-native-community/datetimepicker";

const Book_Lab_Test = ({ navigation, route }) => {
  const { LabID } = route.params;

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

  const [Error, setError] = useState("");
  const [ReportName, setRN] = useState("");
  const [Address, setAddress] = useState("");

  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate7) => {
    const currentDate = selectedDate7 || time;
    setShow(Platform.OS === "ios");
    //setDate(currentDate);
  };
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(Platform.OS === "ios");
    setTime(currentDate);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const submitted = () => {
    if (time == "") {
      setError("Enter Date & Time");
    }
    if (ReportName == "") {
      setError("Enter Report Name");
    }
    if (Address == "") {
      setError("Enter Address");
    }
    if (time != "" && ReportName != "" && Address != "") {
      const id = db.ref("/Lab_Appointment/").push().getKey();
      var dt = time.toLocaleString();
      db.ref("/Lab_Appointment/")
        .child(id)
        .set({
          P_id: Patient_id,
          L_id: LabID,
          Time: dt,
          Status: "Pending",
          ReportName: ReportName,
          Address: Address,
          LabApp_id: id,
        })
        .catch((e) => setError(e));
      ToastAndroid.showWithGravity(
        "Booked Successfully | Wait For Lab's Approval",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      navigation.navigate("Lab_Profile", { LabID: LabID });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon style={styles.backbutton} name="arrow-back" />
          </TouchableOpacity>
        </View>
        <View style={styles.section2}>
          <Image
            style={styles.p_icon}
            source={require("../assets/icons/patient.png")}
          />

          {show && (
            <DateTimePicker
              testID="dateTimePicker1"
              value={time}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View style={styles.dt}>
            <Text style={styles.Inputdatetime}>
              {time.getDate()}-{time.getMonth() + 1}-{time.getFullYear()}
            </Text>
            <TouchableOpacity style={styles.dtButton}>
              <Text onPress={showDatepicker} style={styles.LoginButtonText}>
                Change
              </Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker11"
              value={time}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            />
          )}
          <View style={styles.dt}>
            <Text style={styles.Inputdatetime}>
              {time.getHours()}:{time.getMinutes()}
            </Text>
            <TouchableOpacity style={styles.dtButton}>
              <Text onPress={showTimepicker} style={styles.LoginButtonText}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.Input}
            onChangeText={(newText) => setRN(newText)}
            placeholder="Enter Report Name"
          />
          <TextInput
            style={[styles.Input, { height: 120, textAlignVertical: "top" }]}
            multiline={true}
            onChangeText={(newText) => setAddress(newText)}
            placeholder="Enter Address"
          />
        </View>
        <View style={styles.section3}>
          <Text style={styles.ErrorText}>{Error}</Text>
          <TouchableOpacity style={styles.LoginButton} onPress={submitted}>
            <Text style={styles.LoginButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Book_Lab_Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  header: {
    paddingTop: 70,
    flexDirection: "row",
    paddingBottom: 15,
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
    paddingBottom: 40,
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
  p_icon: {
    width: 114,
    height: 114,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  dt: {
    width: "100%",
    flexDirection: "row",
  },
  Inputdatetime: {
    backgroundColor: "#F7F7F7",
    color: "#525464",
    width: "70%",
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
  dtButton: {
    backgroundColor: "#20C3AF",
    width: "30%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
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
