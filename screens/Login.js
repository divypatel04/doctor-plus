import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, storage } from "../database/firebaseDB";

const Login = ({ navigation }) => {
  const PatientData = [];
  const DoctorData = [];
  const LabData = [];

  const [Error, setError] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  db.ref("/Patient/")
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((ele) => {
        PatientData.push(ele.val());
      });
    });
  db.ref("/Doctor/")
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((ele) => {
        DoctorData.push(ele.val());
      });
    });
  db.ref("/Lab/")
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((ele) => {
        LabData.push(ele.val());
      });
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

  const submitted = () => {
    if (Email == "") {
      setError("Enter Your Email Address");
    }
    if (Password == "") {
      setError("Enter Your Password");
    }

    if ((Email != "") & (Password != "")) {
      var check = 0;

      PatientData.forEach((patient) => {
        if (getColumn(patient, "Email") == Email) {
          if (getColumn(patient, "Password") == Password) {
            console.log("Patient success");
            check = check + 1;
            var id = getColumn(patient, "P_id");
            AsyncStorage.setItem("Patient_Session", id);
            ToastAndroid.showWithGravity(
              "Login Successfully",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
            navigation.navigate("Patient_Home");
          }
        }
      });

      LabData.forEach((Lab) => {
        if (getColumn(Lab, "Email") == Email) {
          if (getColumn(Lab, "Password") == Password) {
            if (getColumn(Lab, "Status") == "Approved") {
              check = check + 1;
              console.log("Lab success");
              var id = getColumn(Lab, "L_id");
              AsyncStorage.setItem("Lab_Session", id);
              ToastAndroid.showWithGravity(
                "Login Successfully",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
              navigation.navigate("Lab_Home");
            }
          }
        }
      });

      DoctorData.forEach((Doctor) => {
        if (getColumn(Doctor, "Email") == Email) {
          if (getColumn(Doctor, "Password") == Password) {
            if (getColumn(Doctor, "status") == "Approved") {
              console.log("Doctor success");
              check = check + 1;
              var id = getColumn(Doctor, "D_id");
              AsyncStorage.setItem("Doctor_Session", id);
              ToastAndroid.showWithGravity(
                "Login Successfully",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
              navigation.navigate("Doctor_Home");
            }
          }
        }

        if ("admin@gmail.com" == Email) {
          if ("admin" == Password) {
            check = check + 1;
            var id = "Admin-Access";
            AsyncStorage.setItem("Admin_Session", id);
            ToastAndroid.showWithGravity(
              "Login Successfully",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
            navigation.navigate("Admin_Home");
          }
        }
      });
      if (check == 0) {
        setError("Something Wrong");
      }
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
        <View style={styles.section1}>
          <Image
            style={styles.logo}
            source={require("../assets/icons/logo.png")}
          />
        </View>
        <View style={styles.section2}>
          <TextInput
            style={styles.Input}
            placeholder="Email"
            onChangeText={(newText) => setEmail(newText)}
          />
          <TextInput
            style={styles.Input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(newText) => setPassword(newText)}
          />
        </View>
        <View style={styles.section3}>
          <View>
            <Text style={styles.ErrorText}> {Error} </Text>
          </View>
          <TouchableOpacity style={styles.LoginButton} onPress={submitted}>
            <Text style={styles.LoginButtonText}> Login </Text>
          </TouchableOpacity>
          <Text style={styles.ortext}> or </Text>
        </View>
        <View style={styles.section4}>
          <Text style={styles.registertext}> Don’ t have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Welcome_Reg")}>
            <Text style={styles.registerhere}> Register Here </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

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
  section1: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
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
    width: 114,
    height: 114,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
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
