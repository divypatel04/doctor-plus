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

const A_Lab_Manage = ({ navigation }) => {
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
  let LabData = [];
  const LD = [];
  db.ref("/Lab/").on("value", (querySnapShot) => {
    let data = querySnapShot.val() ? querySnapShot.val() : {};
    LabData = { ...data };
  });
  var temp = Object.entries(LabData);
  temp.forEach((ele) => {
    LD.push(ele[1]);
  });

  const list = () => {
    return LD.map((element) => {
      const [s, setSS] = useState("");
      storage
        .ref(element.Profile_img)
        .getDownloadURL()
        .then((url) => {
          //from url you can fetched the uploaded image easily
          setSS(url);
          console.log(s);
        });
      if (element.Status == "Pending") {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("A_Lab_ManageSingle", { LabID: element.L_id })
            }
          >
            <View style={styles.List}>
              <Image style={styles.Avatar} source={{ uri: s }} />
              <View style={styles.text}>
                <Text style={styles.Name}>{element.Name}</Text>
                <Text style={styles.Education}>{element.Address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon style={styles.backbutton} name="arrow-back" />
        </TouchableOpacity>
        <Text style={styles.Logintext}>Approve Lab List</Text>
      </View>
      <ScrollView>{list()}</ScrollView>
    </View>
  );
};

export default A_Lab_Manage;

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
  Avatar: {
    width: "100%",
    height: 150,
    borderWidth: 0,
    backgroundColor: "#F7F7F7",
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
    paddingTop: 10,
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
