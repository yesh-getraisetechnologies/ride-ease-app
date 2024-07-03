import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigation } from "expo-router";
import { AuthContext } from "../context/authContext";
import { HttpClient } from "../server/http";
import Toast from 'react-native-toast-message';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [activeOTPInput, setActiveOTPInput] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  const sentOtp = async () => {
    try {
      if (mobileNumber) {
        if (mobileNumber && mobileNumber.length !== 10) {
          return Toast.show({
            type: 'error',
            text1: 'Error Message !',
            text2: "Mobile Number must be 10 digit",
          });
        }
        const { message } = await HttpClient.post("/driver/send-otp", {
          phoneNumber: mobileNumber,
        });
        setActiveOTPInput(true);
        return Toast.show({
          type: 'success',
          text1: message,
        });
        
      }
      return Toast.show({
        type: 'error',
        text1: 'Error Message !',
        text2: "Please Enter Mobile Number",
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error Message!',
        text2: error?.data?.msg,
      });
    }
  };

  const verify = async () => {
    try {
      if (otp) {
        if (otp && otp.length !== 6) {
          return Toast.show({
            type: 'error',
            text1: "OTP must be 6 digit",
          });
        }
        console.log("Mobile Number OTP :", otp);
        const { token, userData } = await HttpClient.post("/driver/login", {
          phoneNumber: mobileNumber,
          otp,
        });
        await login({
          userData,
          token,
        });
        setOtp("");
        setMobileNumber("");
        Toast.show({
          type: 'success',
          text1: "Mobile Number Verified!",
        });
        return navigation.replace("home");
      }
      return Toast.show({
        type: 'error',
        text1: "Please Enter OTP",
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error Message!',
        text2: error?.data?.msg,
      });
    }
  };

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../../assets/images/back-ground-image.jpg")}
    >
      <View style={styles.blurView}>
        <View style={styles.inputParentView}>
          <View style={styles.inputView}>
            <Text
              style={styles.inputText}
              aria-label="Label for Mobile Number"
              nativeID="mobileNumber"
            >
              Mobile Number :
            </Text>
            <TextInput
              aria-label="input"
              aria-labelledby="mobileNumber"
              style={[styles.input, isFocused && styles.inputFocused]}
              onChangeText={(e) => setMobileNumber(e)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={mobileNumber}
              keyboardType="numeric"
            />
          </View>
          <Pressable onPress={() => sentOtp()}>
            <Text style={styles.sentButton}>Get OTP</Text>
          </Pressable>
          <View style={styles.inputView}>
            <Text
              style={styles.inputText}
              aria-label="Label for Mobile Number"
              nativeID="mobileNumber"
            >
              OTP :
            </Text>
            <TextInput
              aria-label="input"
              aria-labelledby="otp"
              style={[styles.input, isFocused && styles.inputFocused]}
              onChangeText={(e) => setOtp(e)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={otp}
              editable={activeOTPInput}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonView}>
            <Pressable onPress={() => verify()} disabled={!activeOTPInput}>
              <Text style={styles.submitButton}>Submit</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setOtp("");
                setMobileNumber("");
              }}
            >
              <Text style={styles.submitButton}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: "100%",
  },
  blurView: {
    backdropFilter: "blur(1px)",
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  inputParentView: {
    padding: 20,
    backgroundColor: "rgba(0,0,0, 0.4)",
  },
  inputView: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
  },
  inputText: {
    color: "#FFF",
    padding: 5,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
  },
  input: {
    borderWidth: 0,
    flex: 1,
    borderBottomWidth: 2,
    borderColor: "#FFF",
    color: "#FFF",
    paddingHorizontal: 5,
  },
  inputFocused: {
    borderWidth: 0,
  },
  sentButton: {
    color: "green",
    fontWeight: "700",
    textAlign: "right",
    marginVertical: 5,
    marginRight: 5,
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  submitButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#FFF",
    backgroundColor: "#162F4E",
    fontWeight: "600",
  },
});

export default Login;
