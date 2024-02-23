import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome_Reg = ({ navigation }) => {
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
        <View style={styles.section3}>
          <TouchableOpacity
            onPress={() => navigation.navigate("P_Register")}
            style={styles.RegisterButton}
          >
            <Text style={styles.RegisterButtonText}>
              {" "}
              Patient Registration{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("D_Register")}
            style={styles.RegisterButton}
          >
            <Text style={styles.RegisterButtonText}> Doctor Registration </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("L_Register")}
            style={styles.RegisterButton}
          >
            <Text style={styles.RegisterButtonText}>
              Lab Manager Registration
            </Text>
          </TouchableOpacity>

          <Text style={styles.ortext}> or </Text>
        </View>
        <View style={styles.section4}>
          <Text style={styles.registertext}> Already have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerhere}> Login Here </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Welcome_Reg;

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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  section3: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  section4: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 15,
  },
  Input: {
    backgroundColor: "#F7F7F7",
    color: "#525464",
    width: 315,
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
  RegisterButton: {
    backgroundColor: "#20C3AF",
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  RegisterButtonText: {
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
});
