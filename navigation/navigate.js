import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { db } from "../database/firebaseDB";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Welcome_Reg from "../screens/Welcome_Reg";
import P_Register from "../screens/P_Register";
import D_Register from "../screens/D_Register";
import L_Register from "../screens/L_Register";

// Patient Area
//import Patient_Home from "../screens/Patients/Patient_Home";
import Patient_Home from "../Patient_Screen/Patient_Home";
import Book_Lab_Test from "../Patient_Screen/Book_Lab_Test";
import Update_Patient_Profile from "../Patient_Screen/Update_Patient_Profile";
import Doctor_List from "../Patient_Screen/Doctor_List";
import Lab_List from "../Patient_Screen/Lab_List";
import D_Profile from "../Patient_Screen/D_Profile";
import Patient_Profile from "../Patient_Screen/Patient_Profile";
import Lab_Profile from "../Patient_Screen/Lab_Profile";
import P_Appointment from "../Patient_Screen/P_Appointment";
import P_AppointmentSee from "../Patient_Screen/P_AppointmentSee";
import P_Report from "../Patient_Screen/P_Report";
import P_SingleReport from "../Patient_Screen/P_SingleReport";
import Book_Appointment from "../Patient_Screen/Book_Appointment";
import P_viewReport from "../Patient_Screen/P_viewReport";

// Doctor Area
import Doctor_Home from "../Doctor_Screen/Doctor_Home";
import Doctor_Manage from "../Doctor_Screen/Doctor_Manage";
import Doctor_ManageSingle from "../Doctor_Screen/Doctor_ManageSingle";
import D_TAppointments from "../Doctor_Screen/D_TAppointments";
import D_SeeAppointments from "../Doctor_Screen/D_SeeAppointments";
import D_HAppointments from "../Doctor_Screen/D_HAppointments";
import Doctor_Profile from "../Doctor_Screen/Doctor_Profile";
import Update_Doctor_Profile from "../Doctor_Screen/Update_Doctor_Profile";
import D_SA from "../Doctor_Screen/D_SA";
import D_addReport from "../Doctor_Screen/D_addReport";

// Lab Area
import Lab_Home from "../Lab_Screen/Lab_Home";
import L_Profile from "../Lab_Screen/L_Profile";
import Lab_Manage from "../Lab_Screen/Lab_Manage";
import L_HAppointments from "../Lab_Screen/L_HAppointments";
import L_SeeAppointments from "../Lab_Screen/L_SeeAppointments";
import L_TAppointments from "../Lab_Screen/L_TAppointments";
import Lab_ManageSingle from "../Lab_Screen/Lab_ManageSingle";
import Update_Lab_Profile from "../Lab_Screen/Update_Lab_Profile";
import L_SA from "../Lab_Screen/L_SA";
import L_addReport from "../Lab_Screen/L_addReport";

// Admin
import A_Doctor_List from "../Admin_Screen/A_Doctor_List";
import A_Doctor_Manage from "../Admin_Screen/A_Doctor_Manage";
import A_Doctor_ManageSingle from "../Admin_Screen/A_Doctor_ManageSingle";
import A_Doctor_Profile from "../Admin_Screen/A_Doctor_Profile";
import A_Lab_List from "../Admin_Screen/A_Lab_List";
import A_Lab_ManageSingle from "../Admin_Screen/A_Lab_ManageSingle";
import A_Lab_Manage from "../Admin_Screen/A_Lab_Manage";
import A_Lab_Profile from "../Admin_Screen/A_Lab_Profile";
import Admin_Home from "../Admin_Screen/Admin_Home";

const Stack = createStackNavigator();

const Navigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Welcome_Reg" component={Welcome_Reg} />
        <Stack.Screen name="P_Register" component={P_Register} />
        <Stack.Screen name="D_Register" component={D_Register} />
        <Stack.Screen name="L_Register" component={L_Register} />

        {/* Patient */}
        <Stack.Screen name="Patient_Home" component={Patient_Home} />
        <Stack.Screen name="Doctor_List" component={Doctor_List} />
        <Stack.Screen name="D_Profile" component={D_Profile} />
        <Stack.Screen name="Book_Appointment" component={Book_Appointment} />
        <Stack.Screen name="Lab_List" component={Lab_List} />
        <Stack.Screen name="Lab_Profile" component={Lab_Profile} />
        <Stack.Screen name="Book_Lab_Test" component={Book_Lab_Test} />
        <Stack.Screen name="P_Appointment" component={P_Appointment} />
        <Stack.Screen name="P_AppointmentSee" component={P_AppointmentSee} />
        <Stack.Screen name="P_Report" component={P_Report} />
        <Stack.Screen name="P_SingleReport" component={P_SingleReport} />
        <Stack.Screen name="Patient_Profile" component={Patient_Profile} />
        <Stack.Screen name="P_viewReport" component={P_viewReport} />
        <Stack.Screen
          name="Update_Patient_Profile"
          component={Update_Patient_Profile}
        />

        {/* Lab */}
        <Stack.Screen name="Lab_Home" component={Lab_Home} />
        <Stack.Screen name="Lab_Manage" component={Lab_Manage} />
        <Stack.Screen name="Lab_ManageSingle" component={Lab_ManageSingle} />
        <Stack.Screen name="L_TAppointments" component={L_TAppointments} />
        <Stack.Screen name="L_SA" component={L_SA} />
        <Stack.Screen name="L_addReport" component={L_addReport} />
        <Stack.Screen name="L_HAppointments" component={L_HAppointments} />
        <Stack.Screen name="L_Profile" component={L_Profile} />
        <Stack.Screen name="L_SeeAppointments" component={L_SeeAppointments} />

        {/* Doctor  */}
        <Stack.Screen name="Doctor_Home" component={Doctor_Home} />
        <Stack.Screen name="Doctor_Manage" component={Doctor_Manage} />
        <Stack.Screen
          name="Doctor_ManageSingle"
          component={Doctor_ManageSingle}
        />
        <Stack.Screen name="D_SA" component={D_SA} />
        <Stack.Screen name="D_addReport" component={D_addReport} />
        <Stack.Screen name="D_TAppointments" component={D_TAppointments} />
        <Stack.Screen name="D_SeeAppointments" component={D_SeeAppointments} />
        <Stack.Screen name="D_HAppointments" component={D_HAppointments} />
        <Stack.Screen name="Doctor_Profile" component={Doctor_Profile} />

        {/* Admin */}
        <Stack.Screen name="Admin_Home" component={Admin_Home} />
        <Stack.Screen name="A_Doctor_Manage" component={A_Doctor_Manage} />
        <Stack.Screen name="A_Doctor_List" component={A_Doctor_List} />
        <Stack.Screen name="A_Lab_List" component={A_Lab_List} />
        <Stack.Screen name="A_Lab_Manage" component={A_Lab_Manage} />
        <Stack.Screen name="A_Doctor_Profile" component={A_Doctor_Profile} />
        <Stack.Screen name="A_Lab_Profile" component={A_Lab_Profile} />
        <Stack.Screen
          name="A_Doctor_ManageSingle"
          component={A_Doctor_ManageSingle}
        />
        <Stack.Screen
          name="A_Lab_ManageSingle"
          component={A_Lab_ManageSingle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigate;
