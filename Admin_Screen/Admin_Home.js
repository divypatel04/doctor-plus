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

const Admin_Home = ({ navigation }) => {
  const logout = () => {
    AsyncStorage.removeItem("Admin_Session");
    console.log("logout");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.WelcomeText}>Welcome, Admin</Text>
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => navigation.navigate("A_Doctor_Manage")}
        >
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/doctor-icon.png")}
            />
            <Text style={styles.homecardText}>Manage Doctor</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("A_Lab_Manage")}>
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/doctor-icon.png")}
            />
            <Text style={styles.homecardText}>Manage Laboratory</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate("A_Doctor_List")}>
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/doctor-icon.png")}
            />
            <Text style={styles.homecardText}>Doctor List</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("A_Lab_List")}>
          <View style={styles.homecard}>
            <Image
              style={styles.homecardIcon}
              source={require("../assets/icons/doctor-icon.png")}
            />
            <Text style={styles.homecardText}>Laboratory List</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
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

export default Admin_Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  WelcomeText: {
    paddingTop: 70,
    paddingBottom: 30,
    fontFamily: "Gilroy-Bold",
    fontSize: 24,
    paddingHorizontal: 10,
  },
  section: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  homecard: {
    width: 150,
    height: 150,
    backgroundColor: "#323440",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
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
    lineHeight: 20,
  },
});
