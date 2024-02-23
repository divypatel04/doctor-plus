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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Image
          style={styles.logo}
          source={require("../assets/icons/logo.png")}
        />
      </View>

      {/* Last Button Section */}
      <View style={styles.section2}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.ManageButton}
        >
          <Text style={styles.AppButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.ortext}>or</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Welcome_Reg")}
          style={styles.ManageButton}
        >
          <Text style={styles.AppButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  section1: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 238,
    height: 285,
  },
  section2: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  ManageButton: {
    backgroundColor: "#20C3AF",
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  AppButtonText: {
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
    paddingVertical: 16,
  },
});
