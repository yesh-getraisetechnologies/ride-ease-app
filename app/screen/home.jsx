import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { AuthContext } from "../context/authContext";
import { HttpClient } from "../server/http";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";

const Home = () => {
  const { logout, userData, saveAllActiveTrip, saveUserData } =
    useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("login");
      Toast.show({
        type: "success",
        text1: "Logout Successful",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error Message!",
        text2: error?.data?.message,
      });
    }
  };

  const getAllActiveTrip = async () => {
    try {
      const data = await HttpClient.get("/trips/getActiveTrips");
      saveAllActiveTrip(
        data.filter((item) => item?.tripId === data[0]?.tripId)
      );
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error Message!",
        text2: error?.data?.message,
      });
    }
  };

  const getUserData = async () => {
    try {
      const { userData } = await HttpClient.get("/auth/me");
      await saveUserData(userData);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error Message!",
        text2: error?.data?.message,
      });
    }
  };

  useEffect(() => {
    getAllActiveTrip();
    getUserData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.idBlock}>
        <View style={styles.info}>
          <View style={styles.tabField}>
            <View style={styles.infoRow}>
              <Text style={styles.welcomeText}>Welcome To Ride Ease</Text>
            </View>
            <View style={styles.infoRow}>
              <Text>
                Full Name - {userData?.fullName}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text>
                Mobile Number - {userData?.mobileNum}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text>
                Vehicle No. - {userData?.vehicleNumber}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text>
                Vehicle Type - {userData?.vehicleType}
              </Text>
            </View>
            <View style={styles.buttonView}>
              <Pressable onPress={() => navigation.navigate("activeTrip")}>
                <View style={styles.submitButton}>
                  <Feather name="navigation" size={18} color="#FFF" />
                  <Text style={styles.buttonText}>Your Active Trip</Text>
                </View>
              </Pressable>
              <Pressable onPress={handleLogout}>
                <View style={styles.submitButton}>
                  <Text style={styles.buttonText}>Logout</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  idBlock: {
    backgroundColor: "#ffff",
    borderColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 7,
    flex: 1,
  },
  border__right_0: {
    borderRightWidth: 0,
  },
  info: {
    display: "flex",
    paddingHorizontal: 5,
    padding: 14,
    paddingTop: 5,
    borderColor: "#C7C7C7",
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: "#E8EEF4",
    // flex: 1,
  },
  infoRow: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    marginVertical: 5,
    gap: 5,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "800",
    color: "#1E88E5",
  },
  tabField: {
    backgroundColor: "#ffff",
    borderRadius: 10,
    padding: 5,
  },
  tabButton: {
    flexDirection: "column",
    paddingHorizontal: 10,
    color: "black",
    fontWeight: "500",
    borderRightWidth: 2,
  },
  buttonView: {
    marginTop: 20,
    gap: 10,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 10,
    backgroundColor: "#1E88E5",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    width: "80%",
    textAlign: "center",
    marginHorizontal: "auto",
  },
});

export default Home;
