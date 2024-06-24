import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RouteForRide from "./routeForRide";
import Employee from "./employee";

const Home = () => {
  const [tab, setTab] = useState(1);

  return (
    <SafeAreaView>
      <View style={styles.idBlock}>
        <Text style={styles.idText}>Trip Id:1234545</Text>
      </View>
      <View style={styles.mainView}>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Text style={styles.site}>Site: Google</Text>
            <Text style={styles.loginTime}>Login: 6:45</Text>
            <Text style={styles.dateTime}>01/01/2024 04:00 AM</Text>
          </View>
          <View style={styles.tabField}>
            <View style={styles.tabView}>
              <Pressable onPress={() => setTab(1)}>
                <Text style={[styles.tabButton, tab === 1 && styles.colorBlue]}>
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
            {tab === 1 ? <RouteForRide /> : <Employee />}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  idBlock: {
    borderBottomWidth: 1,
    backgroundColor: "#ffff",
    borderColor: "grey",
    padding: 10,
  },
  idText: {
    color: "#143153",
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
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    gap: 5,
  },
  site: {
    color: "green",
  },
  loginTime: {
    color: "orange",
    marginLeft: 10,
  },
  dateTime: {
    marginLeft: 10,
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

export default Home;
