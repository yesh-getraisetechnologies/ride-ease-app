import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/authContext";
import RouteForRide from "./routeForRide";
import Employee from "./employee";
import IndiaTime from "../components/getIndiaTime";
import { HttpClient } from "../server/http";
import { ScrollView } from "react-native";
import Toast from "react-native-toast-message";

const ActiveTrip = () => {
  const { userData, saveAllActiveTrip } = useContext(AuthContext);
  const [tab, setTab] = useState(1);
  const [tripId, setTripId] = useState(null);

  const getAllActiveTrip = async () => {
    try {
      const data = await HttpClient.get("/trips/getActiveTrips");
      setTripId(data[0]?.tripId);
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

  useEffect(() => {
    getAllActiveTrip();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.idBlock}>
        <View style={{ flex: 1 }}>
          <Text style={styles.idText}>Trip Id: {tripId}</Text>
        </View>
        <View style={styles.mainView}>
          <View style={styles.info}>
            <View style={styles.infoRow}>
              <Text style={styles.colorGreen}>
                Site: {userData?.site ? userData?.site : "Google"}
              </Text>
              <Text>
                <Text style={styles.colorOrange}>Login:</Text>
                <Text style={styles.dateTime}>
                  {" "}
                  <IndiaTime data={new Date()} />
                </Text>
              </Text>
            </View>
            <View style={styles.tabField}>
              <View style={styles.tabView}>
                <Pressable onPress={() => setTab(1)}>
                  <Text
                    style={[styles.tabButton, tab === 1 && styles.colorBlue]}
                  >
                    Route Map
                  </Text>
                </Pressable>
                <Pressable onPress={() => setTab(2)}>
                  <Text
                    style={[
                      styles.tabButton,
                      styles.border__right_0,
                      tab === 2 && styles.colorBlue,
                    ]}
                  >
                    Employees
                  </Text>
                </Pressable>
              </View>
              <ScrollView
                style={{ height: Dimensions.get("window").height - 200 }}
              >
                {tab === 1 ? <RouteForRide /> : <Employee />}
              </ScrollView>
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
    flex: 1,
  },
  idText: {
    color: "#1565C0",
    paddingLeft: 10,
  },
  colorBlue: {
    color: "#1E88E5",
  },
  border__right_0: {
    borderRightWidth: 0,
  },
  mainView: {
    padding: 7,
    backgroundColor: "#ffff",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    gap: 5,
  },
  colorGreen: {
    color: "green",
  },
  colorOrange: {
    color: "orange",
  },
  sentButton: {
    color: "green",
    fontWeight: "700",
    textAlign: "right",
    marginVertical: 5,
    marginRight: 5,
  },
  tabField: {
    backgroundColor: "#ffff",
    borderRadius: 10,
    padding: 5,
  },
  tabView: {
    flexDirection: "row",
    marginTop: 5,
    paddingVertical: 5,
    gap: 1,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#FFFF",
    marginRight: "auto",
  },
  tabButton: {
    flexDirection: "column",
    paddingHorizontal: 10,
    color: "black",
    fontWeight: "500",
    borderRightWidth: 2,
  },
});

export default ActiveTrip;
