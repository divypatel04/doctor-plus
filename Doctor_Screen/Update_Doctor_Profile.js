import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Button, TouchableOpacity,TextInput, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

const Update_Doctor_Profile = ({ navigation }) => {
     // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
        }
    } 
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this appp to access your camera!");
          return;
        }
    
        const result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
          setPickedImagePath(result.uri);
        }
      }
  return (
        <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Icon style={styles.backbutton} name="arrow-back" />
              </TouchableOpacity>
          </View>
          <View style={styles.section2}>
            <View>
                {
                pickedImagePath !== '' && <Image
                source={{ uri: pickedImagePath }}
                style={styles.p_icon}
                />
             }
            </View>
            <View style={styles.ImageButton}>
            <TouchableOpacity style={styles.Select} onPress={showImagePicker}>
              <Text style={styles.LoginButtonText}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Cemera} onPress={openCamera}>
              <Text style={styles.LoginButtonText}>Open Cemera</Text>
            </TouchableOpacity>
            </View>
            <TextInput style={styles.Input} 
            placeholder="Enter Full Name" />
            <TextInput style={styles.Input} 
            placeholder="Enter Email_id" />
            <TextInput style={styles.Input} 
            placeholder="Password" 
            secureTextEntry={true}
            />
            <TextInput style={styles.Input}
            keyboardType="numeric" 
            placeholder="Enter Phone_no" />
            <TextInput style={styles.Input}
            multiline={true} 
            placeholder="Enter Address" />
          </View>
          <View style={styles.section3}>
            <TouchableOpacity style={styles.LoginButton} onPress={() => navigation.navigate('Patient_Home')}>
              <Text style={styles.LoginButtonText}>Update Profile</Text>
              </TouchableOpacity>
              </View>
          </ScrollView>
      </View>
  
  );
}

export default Update_Doctor_Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
  },
  header:{
    paddingTop: 70,
    flexDirection: "row",
    paddingBottom: 15,
  },
  logo: {
    width: 238,
    height: 285,
  },
  Logintext:{
    textAlign: 'center',
    color:'#525464',
    fontSize: 18,
    height: 24,
    width : '100%',
    fontFamily:'Gilroy-SemiBold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section2:{
    flex: 1,
    width:'100%',
    justifyContent:'center',
    alignItems: 'center',
  },
  section3:{
    width:'100%',
    justifyContent:'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  Input:{
    backgroundColor: '#F7F7F7',
    color:'#525464',
    width: "100%",
    height: 60,
    padding: 16,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    color: "#B0B0C3",
  },
  LoginButton:{
    backgroundColor: "#20C3AF",
    width: "100%",
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButtonText:{
    fontSize: 16,
    color: "#fff",
    fontWeight: '600',
    letterSpacing: 0.4,
    alignSelf: "center",
    fontFamily: 'Gilroy-SemiBold',
  },
  registertext:{
    fontSize: 16,
    color: "#838391",
    letterSpacing: 0.4,
    alignSelf: "center",
    fontFamily: 'Gilroy-SemiBold',
    paddingVertical: 16,
  },
  registerhere:{
    fontSize: 16,
    color: "#FFB19D",
    letterSpacing: 0.4,
    alignSelf: "center",
    fontFamily: 'Gilroy-SemiBold',
    paddingVertical: 16,
  },
  p_icon:{
    width: 114,
    height: 114,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:30,
    resizeMode: 'stretch'
  },
  Select:{
    backgroundColor: "#20C3AF",
    width: "45%",
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }, Cemera:{
    backgroundColor: "#20C3AF",
    width: "45%",
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageButton:{
    width:'100%',
    justifyContent:'space-around',
    alignItems: 'center',
    paddingVertical:15,
    flexDirection: 'row',
  }
});
