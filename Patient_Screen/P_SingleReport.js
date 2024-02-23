import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Button, TouchableOpacity,TextInput, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import P_Appointment from "./P_Appointment";


const P_SingleReport = ({ navigation }) => {
  return (
        <View style={styles.container}>
          <ScrollView>
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Icon style={styles.backbutton} name="arrow-back" />
              </TouchableOpacity>
          </View>
          <View style={styles.section1}>
            <View style={styles.logocrad}>
            <Image style={styles.logo} source={require('../assets/icons/doctor-icon.png')} />
            <Text style={styles.D_Name}>Dr. Kishan Patel</Text>

            <Text style={styles.datetime}>Date:- 05/03/2022 Time:- 09:25 AM</Text>
            </View>
            
          </View>
           <View style={styles.section2}>
            {/*<TouchableOpacity style={styles.LoginButton}>
              <Text style={styles.LoginButtonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.LoginButton}>
              <Text style={styles.LoginButtonText}>Reject</Text>
            </TouchableOpacity>*/}
            <TouchableOpacity><Text style={styles.StatusText}> Download Report</Text></TouchableOpacity>
          </View> 

          <View style={styles.section3}>
            <View style={styles.List}>
                <View style={styles.text}>
                <Text style={styles.Name}>Description</Text> 
                <Text style={styles.Education}>Patients can search for the specialist doctor’s profile and book an appointment.
2. Patients can view their past visit details under History section
3. Patient can run health check up (AI Program) and order medication from linked pharmacy
4. Patients can book an appointment for laboratory tests
5. Patient gets reminder for medication every day</Text>
                </View>
            </View>
            <View style={styles.List}>
                <View style={styles.text}>
                <Text style={styles.Name}>Phone no</Text> 
                <Text style={styles.Education}>+91-7698904334</Text>
                </View>
            </View>
            <View style={styles.List}>
                <View style={styles.text}>
                <Text style={styles.Name}>About</Text> 
                <Text style={styles.Education}>Hematologists</Text>
                </View>
            </View>
          </View>
          </ScrollView>
      </View>
  );
}

export default P_SingleReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  header:{
    paddingTop: 70,
    flexDirection: "row",
    paddingBottom: 15,
    paddingHorizontal: 25,
  },
  logocrad:{
    alignItems: 'center',
  },
  section1:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 114,
    height: 114,
  },
  section2:{
    width:'100%',
    justifyContent:'space-around',
    alignItems: 'center',
    paddingVertical:40,
    paddingHorizontal:20,
    flexDirection: 'row',
  },
  section3:{
    width:'100%',
    backgroundColor:'#525464',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  LoginButton:{
    backgroundColor: "#20C3AF",
    width: "45%",
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
  List:{
    width: '100%',
    backgroundColor: '#525464',
    flexDirection:'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor:'#E2E2E0'
    },
Name:{
    color:'#838391',
    fontSize: 14,
    fontFamily: "Gilroy-SemiBold",
    letterSpacing: 0.4,
    },
D_Name:{
    paddingTop:26,
    paddingBottom:6,
    color:'#525464',
    fontSize: 24,
    fontFamily:"Gilroy-Medium",
    letterSpacing: 0.4,
},
Education:{
    color:'#fff',
    fontSize: 16,
    opacity: 7,
    letterSpacing: 0.4,
    marginTop: 5,
    fontFamily:"Gilroy-Medium",
    },
D_Education:{
    fontSize: 16,
    color: "#FFB19D",
    letterSpacing: 0.4,
    alignSelf: "center",
    fontFamily: 'Gilroy-SemiBold',
    textDecorationLine: "underline",
},
text:{
    marginLeft:15,
    marginVertical:15,
},
datetime: {
    marginTop: 25,
    opacity: 0.5,

},
StatusText: {

    height: 60,
    fontSize: 16,
    color: "#000",
    fontWeight: '600',
    letterSpacing: 0.4,
    alignContent: "center",
    justifyContent: "center",
    textAlign: 'center',
    fontFamily: 'Gilroy-SemiBold',
}
});
