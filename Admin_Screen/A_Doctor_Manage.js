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

const A_Doctor_Manage = ({ navigation }) => {
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
  const DD = [];
  db.ref("/Doctor/").on("value", (querySnapShot) => {
    let data = querySnapShot.val() ? querySnapShot.val() : {};
    DoctorData = { ...data };
  });
  console.log(DoctorData);
  var temp = Object.entries(DoctorData);
  temp.forEach((ele) => {
    DD.push(ele[1]);
  });

  const list = () => {
    return DD.map((element) => {
      const [s, setSS] = useState("");
      storage
        .ref(element.Profile_img)
        .getDownloadURL()
        .then((url) => {
          //from url you can fetched the uploaded image easily
          setSS(url);
          console.log(s);
        });
      if (element.status == "Pending") {
        return (
          <TouchableOpacity
            key={element.D_id}
            onPress={() =>
              navigation.navigate("A_Doctor_ManageSingle", {
                DoctorID: element.D_id,
              })
            }
          >
            <View style={styles.List}>
              <Image
                style={[
                  styles.Avatar,
                  { width: 100, height: 100, resizeMode: "center" },
                ]}
                source={{ uri: s }}
              />
              <View style={styles.text}>
                <Text style={styles.Name}>{element.Name}</Text>
                <Text style={styles.Education}>{element.Profession}</Text>
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
        </View>
        {list()}
      </View>
    </ScrollView>
  );
};

export default A_Doctor_Manage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 70,
    flexDirection: "row",
    paddingBottom: 25,
  },
  WelcomeText: {
    textAlign: "center",
    paddingVertical: 50,
    fontFamily: "Gilroy-SemiBold",
    fontSize: 22,
    paddingHorizontal: 10,
    letterSpacing: 0.4,
    color: "#525464",
    justifyContent: "center",
    alignItems: "center",
  },
  List: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E2E0",
  },
  Avatar: {
    width: 100,
    height: 100,
    borderWidth: 0,
    backgroundColor: "#F7F7F7",
  },
  Name: {
    color: "#525464",
    fontSize: 22,
    fontFamily: "Gilroy-SemiBold",
    letterSpacing: 0.4,
  },
  Email: {
    color: "#616173",
    fontSize: 14,
    opacity: 8,
    fontFamily: "Gilroy-Regular",
  },
  Education: {
    color: "#838391",
    fontSize: 18,
    opacity: 7,
    fontFamily: "Gilroy-Medium",
  },
  text: {
    marginVertical: 20,
    marginLeft: 15,
  },
});
