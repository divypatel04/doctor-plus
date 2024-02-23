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

const Doctor_List = ({ navigation }) => {
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

  let DoctorData = [];
  const DD = [];
  db.ref("/Doctor/").on("value", (querySnapShot) => {
    let data = querySnapShot.val() ? querySnapShot.val() : {};
    DoctorData = { ...data };
  });
  var temp = Object.entries(DoctorData);
  temp.forEach((ele) => {
    DD.push(ele[1]);
  });
  // const [ss,setSS] = useState('');
  // let d= storage.ref(getColumn(DD[4],"Profile_img")).getDownloadURL().then((url) => {
  //   //from url you can fetched the uploaded image easily
  //   setSS(url);
  // })
  // .catch((e) => console.log('getting downloadURL of image error => ', e));
  // console.log(ss);
  // // console.log(d);
  // setSS('https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg');

  function getColumn(obj, str) {
    const temp = Object.entries(obj);
    var i = 0;
    for (i = 0; i < temp.length; i++) {
      if (temp[i][0] == str) {
        return temp[i][1];
      }
    }
  }
  // const [s,setSS] = useState('');
  // storage.ref(getColumn(DD[7],"Profile_img")).getDownloadURL().then((url) => {
  //     //from url you can fetched the uploaded image easily
  //     setSS(url);
  //     console.log(s);
  // })
  // let Image_Http_URL = { uri:  };
  // const tt = getColumn(DD[3],'Profile_img');

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
      if (element.status == "Approved") {
        return (
          <TouchableOpacity
            key={element.D_id}
            onPress={() =>
              navigation.navigate("D_Profile", { DoctorID: element.D_id })
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

export default Doctor_List;
AppRegistry.registerComponent("Doctor_List", () => Doctor_List);

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