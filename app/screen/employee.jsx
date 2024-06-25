import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AccordianWrapper from "../components/accordian";
import { FlatList } from "react-native";

export default function Employee() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [otp, setOtp] = useState("");
  const [OTPSent, setOTPSent] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const Array = [1, 2, 3, 4, 5];

  const optSentToEmployee = () => {
    try {
      setOTPSent(true);
      setSeconds(180);
      ToastAndroid.showWithGravity(
        "OTP Sent To Employee!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    } catch (error) {
      console.error(error);
    }
  };

  const optSentToSelf = () => {
    try {
      setOTPSent(true);
      setSeconds(180);
      ToastAndroid.showWithGravity(
        "OTP Sent To Self!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOTP = () => {
    try {
      if (otp.length === 6) {
        setOtp("");
        setOTPSent(false);
        setActiveIndex(null);
        ToastAndroid.showWithGravity(
          "Mobile Number Verified!",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      } else {
        ToastAndroid.showWithGravity(
          "OTP must be 6 digit!",
          ToastAndroid.LONG,
          ToastAndroid.TOP
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  return (
    <View style={styles.mainView}>
      <FlatList
        data={Array}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <AccordianWrapper
            key={index}
            isOpen={activeIndex === index}
            toggleCheckbox={() => handleItemClick(index)}
            mainViewStyle={styles.parentListView}
            titleView={
              <View style={styles.listView}>
                <Text>Ravi Shankar - {item}</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Feather name="phone-call" size={18} color="#1E88E5" />
                  {activeIndex === index ? (
                    <AntDesign name="minuscircleo" size={18} color="black" />
                  ) : (
                    <AntDesign name="pluscircleo" size={18} color="black" />
                  )}
                </View>
              </View>
            }
            descView={
              <View>
                {OTPSent ? (
                  <>
                    <View style={styles.buttonView}>
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
                      <Text>{formatTime(seconds)}</Text>
                      <Pressable
                        disabled={seconds !== 0}
                        onPress={() => optSentToSelf()}
                      >
                        <Text
                          style={[
                            styles.reSend,
                            seconds !== 0 && styles.halfOpacity,
                          ]}
                        >
                          Re-Send
                        </Text>
                      </Pressable>
                    </View>
                    {otp ? (
                      <View>
                        <Pressable onPress={() => verifyOTP()}>
                          <Text style={styles.submitButton}>Submit</Text>
                        </Pressable>
                      </View>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <View style={styles.buttonView}>
                    <Pressable onPress={() => optSentToEmployee()}>
                      <Text style={[styles.button, styles.selfOTPButton]}>
                        Employee OTP
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => optSentToSelf()}>
                      <Text style={styles.button}>Self OTP</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginVertical: 40,
    marginHorizontal: 10,
    gap: 5,
  },
  parentListView: {
    backgroundColor: "#E8EEF4",
    borderRadius: 25,
    marginBottom: 5,
    padding: 5,
  },
  listView: {
    backgroundColor: "#E8EEF4",
    borderRadius: 25,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    gap: 10,
    backgroundColor: "#E8EEF4",
  },
  selfOTPButton: {
    backgroundColor: "#162F4E",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "#FFF",
    backgroundColor: "#AB0302",
    fontWeight: "600",
    borderRadius: 5,
    borderColor: "gray",
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  inputView: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
  },
  inputText: {
    padding: 5,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 2,
    paddingHorizontal: 5,
    width: "30%",
  },
  inputFocused: {
    borderWidth: 0,
  },
  reSend: {
    color: "green",
    cursor: "pointer",
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#FFF",
    backgroundColor: "#162F4E",
    fontWeight: "600",
    marginHorizontal: "auto",
    marginBottom: 10,
  },
  halfOpacity: {
    opacity: 0.5,
  },
});
