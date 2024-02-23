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
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../database/firebaseDB";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const D_Register = ({ navigation }) => {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [filename, setFileName] = useState("");

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
      setProfile(result.uri);
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
      setProfile(result.uri);
    }
  };

  //Database Settings
  const [Error, setError] = useState("");
  const [Profile, setProfile] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone_no, setPhone_no] = useState("");
  const [Address, setAddress] = useState("");
  const [Education, setEducation] = useState("");
  const [Profession, setProfession] = useState("");
  const [About, setAbout] = useState("");
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const submitted = async () => {
    console.log(Profile);
    if (Name == "") {
      setError("Enter Your Name");
    }
    if (Email == "") {
      setError("Enter Your Email");
    }
    if (Password == "") {
      setError("Enter Your Password");
    }
    if (Phone_no == "") {
      setError("Enter Your Phone No");
    }
    if (Education == "") {
      setError("Enter Your Education");
    }
    if (Profession == "") {
      setError("Enter Your Profession");
    }
    if (About == "") {
      setError("Enter Your About Section");
    }
    if (Address == "") {
      setError("Enter Your Address");
    }
    if (Profile == "") {
      setError("Please Select Your Profile Image");
    }
    if (reg.test(Email) == false) {
      setError("Enter Valid Email ID");
    }
    if (Phone_no.length != 10) {
      setError("Enter Valid Phone Number");
    }

    if (
      Name !== "" &&
      Email !== "" &&
      Password !== "" &&
      Phone_no !== "" &&
      Education !== "" &&
      Profession !== "" &&
      About !== "" &&
      Address !== "" &&
      Profile !== ""
    ) {
      if (reg.test(Email) != false) {
        if (Phone_no.length == 10) {
          const id = db.ref("/Doctor").push().getKey();

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
            xhr.open("GET", Profile, true);
            xhr.send(null);
          });

          let pat = `/images/${filename}.jpg`;
          const res = storage.ref(pat).put(blob);
          res.on("state_changed", (snapshot) => {
            setTransferred(
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) *
                10000
            );
          });
          try {
            await res;
          } catch (e) {
            console.error(e);
          }
          console.log(res);
          db.ref("/Doctor/")
            .child(id)
            .set({
              Name: Name,
              Email: Email,
              Password: Password,
              Phone_no: Phone_no,
              Address: Address,
              Profile_img: pat,
              Profession: Profession,
              Education: Education,
              About: About,
              status: "Pending",
              D_id: id,
            })
            .catch((e) => setError(e));
          ToastAndroid.showWithGravity(
            "Register Successf  ully | Wait for Admin Approval",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
          navigation.navigate("Login");
        }
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
        <View style={styles.section2}>
          <TouchableOpacity>
            <View>
              {pickedImagePath !== "" && (
                <Image
                  source={{ uri: pickedImagePath }}
                  style={styles.p_icon}
                />
              )}
              {pickedImagePath == "" && (
                <Image
                  source={require("../assets/icons/doctor-icon.png")}
                  style={styles.p_icon}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.ImageButton}>
            <TouchableOpacity style={styles.Select} onPress={showImagePicker}>
              <Text style={styles.LoginButtonText}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Cemera} onPress={openCamera}>
              <Text style={styles.LoginButtonText}>Open Cemera</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.Input}
            placeholder="Enter Full Name"
            onChangeText={(newText) => setName(newText)}
          />
          <TextInput
            style={styles.Input}
            placeholder="Enter Email_id"
            onChangeText={(newText) => setEmail(newText)}
          />
          <TextInput
            style={styles.Input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(newText) => setPassword(newText)}
          />
          <TextInput
            style={styles.Input}
            keyboardType="numeric"
            placeholder="Enter Phone_no"
            onChangeText={(newText) => setPhone_no(newText)}
          />
          <TextInput
            style={styles.Input}
            placeholder="Enter  Education"
            onChangeText={(newText) => setEducation(newText)}
          />
          <TextInput
            style={styles.Input}
            placeholder="Enter Profession"
            onChangeText={(newText) => setProfession(newText)}
          />
          <TextInput
            style={[styles.Input, { height: 120, textAlignVertical: "top" }]}
            multiline={true}
            placeholder="About"
            onChangeText={(newText) => setAbout(newText)}
          />
          <TextInput
            style={[styles.Input, { height: 120, textAlignVertical: "top" }]}
            multiline={true}
            placeholder="Enter Clinic Address"
            onChangeText={(newText) => setAddress(newText)}
          />
        </View>
        <View style={styles.section3}>
          <View>
            <Text style={styles.ErrorText}>{Error}</Text>
          </View>
          <TouchableOpacity style={styles.LoginButton} onPress={submitted}>
            <Text style={styles.LoginButtonText}>Submit</Text>
          </TouchableOpacity>
          <Text style={styles.ortext}>or</Text>
        </View>
        <View style={styles.section4}>
          <Text style={styles.registertext}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerhere}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default D_Register;

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
