import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import { AntDesign, Feather, FontAwesome, Entypo } from "@expo/vector-icons";
import AccordianWrapper from "../components/accordian";
import { AuthContext } from "../context/authContext";
import { HttpClient } from "../server/http";
import Toast from "react-native-toast-message";

export default function Employee() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [otpArray, setOtpArray] = useState([]);
  const [OTPSentArray, setOTPSentArray] = useState([]);
  const [secondsArray, setSecondsArray] = useState([]);
  const { allActiveTrip, saveAllActiveTrip } = useContext(AuthContext);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const optSentToEmployee = async (employee, index) => {
    try {
      const { tripId, employeeId, employeePhone, employeeName } = employee;
      await HttpClient.post("/trips/resendSMS", {
        tripId,
        employeeId,
        employeePhone,
        employeeName,
      });
      const updatedOTPSentArray = [...OTPSentArray];
      updatedOTPSentArray[index] = true;
      setOTPSentArray(updatedOTPSentArray);

      const updatedSecondsArray = [...secondsArray];
      updatedSecondsArray[index] = 30;
      setSecondsArray(updatedSecondsArray);
      return Toast.show({
        type: "success",
        text1: `OTP Sent To Employee! - ${employeePhone}`,
      });
    } catch (error) {
      console.error('Error in otp Sent To Employee', error);
    }
  };

  const verifyOTP = async (index) => {
    try {
      if (otpArray[index] && otpArray[index].length === 6) {
        const { employeeId, employeePhone, _id } = allActiveTrip[index];
        await HttpClient.post("/trips/verifySMS", {
          _id,
          employeeId,
          employeePhone,
          otp: otpArray[index],
        });
        const updatedOtpArray = [...otpArray];
        updatedOtpArray[index] = "";
        setOtpArray(updatedOtpArray);

        const updatedOTPSentArray = [...OTPSentArray];
        updatedOTPSentArray[index] = false;
        setOTPSentArray(updatedOTPSentArray);

        const updatedSecondsArray = [...secondsArray];
        updatedSecondsArray[index] = 0;
        setSecondsArray(updatedSecondsArray);

        const result = await HttpClient.get("/trips/getActiveTrips");
        saveAllActiveTrip(
          result.filter((item) => item?.tripId === result[0]?.tripId)
        );
        handleItemClick(index)
        return Toast.show({
          type: "success",
          text1: "Mobile Number Verified!",
        });
      } else {
        return Toast.show({
          type: "error",
          text1: "OTP must be 6 digit!",
        });
      }
    } catch (error) {
      console.error('Error in Verify otp:', error);
    }
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const callToEmployee = async (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      return Toast.show({
        type: "error",
        text1: `Don't know how to open this URL: ${url}`,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsArray((prevSecondsArray) =>
        prevSecondsArray.map((sec) => (sec > 0 ? sec - 1 : 0))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView>
      <View style={styles.mainView}>
        <FlatList
          data={allActiveTrip}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <AccordianWrapper
              isOpen={activeIndex === index}
              toggleCheckbox={() => {
                !item?.isVerified && handleItemClick(index)
              }}
              mainViewStyle={styles.parentListView}
              titleView={
                <View style={styles.listView}>
                  <Text>
                    {item?.employeeName.length > 15 ?  item?.employeeName.slice(0, 15) + "..." : item?.employeeName }
                    {" - "}
                    {item?.employeePhone}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                      onPress={() => callToEmployee(item?.employeePhone)}
                    >
                      <Feather name="phone-call" size={18} color="#1E88E5" />
                    </TouchableOpacity>
                    {!item?.isVerified && (activeIndex === index ? (
                      <AntDesign name="minuscircleo" size={18} color="black" />
                    ) : (
                      <AntDesign name="pluscircleo" size={18} color="black" />
                    ))}
                    {item?.isVerified ? (
                      <FontAwesome
                        name="check-circle"
                        size={18}
                        color="#7BCB00"
                      />
                    ) : (
                      <Entypo name="circle-with-cross" size={18} color="red" />
                    )}
                  </View>
                </View>
              }
              descView={
                <View>
                  {OTPSentArray[index] ? (
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
                          aria-labelledby={`otp${index}`}
                          style={[
                            styles.input,
                            isFocused && styles.inputFocused,
                          ]}
                          onChangeText={(e) => {
                            const updatedOtpArray = [...otpArray];
                            updatedOtpArray[index] = e;
                            setOtpArray(updatedOtpArray);
                          }}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          value={otpArray[index] || ""}
                          keyboardType="numeric"
                        />
                        <Text>{formatTime(secondsArray[index] || 0)}</Text>
                        <Pressable
                          disabled={secondsArray[index] !== 0}
                          onPress={() => optSentToEmployee(item, index)}
                        >
                          <Text
                            style={[
                              styles.reSend,
                              secondsArray[index] !== 0 && styles.halfOpacity,
                            ]}
                          >
                            Re-Send
                          </Text>
                        </Pressable>
                      </View>
                      {otpArray[index] ? (
                        <View>
                          <Pressable
                            onPress={() => verifyOTP(index)}
                            disabled={!otpArray[index]}
                          >
                            <Text style={styles.submitButton}>Verify</Text>
                          </Pressable>
                        </View>
                      ) : null}
                    </>
                  ) : (
                    <View style={styles.buttonView}>
                      <Pressable
                        onPress={() => {
                          const updatedOTPSentArray = [...OTPSentArray];
                          updatedOTPSentArray[index] = true;
                          setOTPSentArray(updatedOTPSentArray);
                          const updatedSecondsArray = [...secondsArray];
                          updatedSecondsArray[index] = 30;
                          setSecondsArray(updatedSecondsArray);
                        }}
                      >
                        <Text style={[styles.button, styles.selfOTPButton]}>
                          Verify Employee OTP
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              }
            />
          )}
        />
      </View>
    </ScrollView>
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
