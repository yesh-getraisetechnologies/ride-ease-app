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

const App = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const sentOtp = async () => {
    try {
      ToastAndroid.showWithGravity(
        `OTP Sent To : ${mobileNumber}`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP
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
    <ImageBackground
      style={styles.bgImage}
      source={require("../assets/images/back-ground-image.jpg")}
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
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonView}>
            <Pressable onPress={() => verify()}>
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
    background: "transparent",
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

export default App;
