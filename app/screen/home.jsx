import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  Pressable,
  ToastAndroid,
} from "react-native";
import { useNavigation, Tabs } from "expo-router";
import { Link } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { idText } from "typescript";

const Home = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");

  const sentOtp = async () => {
    try {
      ToastAndroid.showWithGravity(
        `OTP Sent To : ${mobileNumber}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      console.log("Mobile Number :", mobileNumber);
    } catch (error) {
      console.error(error);
    }
  };

  const verify = async () => {
    try {
      console.log("Mobile Number OTP :", otp, mobileNumber);
      setOtp("");
      setMobileNumber("");
      ToastAndroid.showWithGravity(
        "Mobile Number Verified!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.idBlock}>
        <Text style={styles.idText}>Trip Id:1234545</Text>
      </View>
      <View>
        <Text>Site: Google</Text>
        <Text>Login: 6:45</Text>
        <Text>01/01/2024 04:00 AM</Text>
      </View>

      <View style={styles.tabView}>
        <Pressable onPress={() => verify()}>
          <Text style={styles.tabButton}>Route Map</Text>
        </Pressable>
        <Pressable onPress={() => verify()}>
          <Text style={styles.tabButton}>Employees</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  idBlock: {
    borderBottomWidth: 1,
    borderColor: "grey",
    padding: 10,


  },
  idText: {
    // fontSize:"100px",
    // margin: 20,
    color: "blue",
  },
  sentButton: {
    color: "green",
    fontWeight: "700",
    textAlign: "right",
    marginVertical: 5,
    marginRight: 5,
  },
  tabView: {
    flexDirection: 'row',
    // alignItems: "flex-start",
    // justifyContent: "center",

    marginTop: 20,
    paddingVertical: 10,
    gap: 1,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: "#FFFF",
    marginRight: 'auto',


  },
  tabButton: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: "black",
    fontWeight: "600",
    borderLeftWidth: 2

  },
});

export default Home;
