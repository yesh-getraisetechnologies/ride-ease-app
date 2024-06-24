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
      <View>
        <Text>Site: Google</Text>
        <Text>Login: 6:45</Text>
        <Text>01/01/2024 04:00 AM</Text>
      </View>
      <View>
        <View style={styles.tabView}>
          <Pressable onPress={() => setTab(1)}>
            <Text style={[styles.tabButton]}>Route Map</Text>
          </Pressable>
          <Pressable onPress={() => setTab(2)}>
            <Text style={[styles.tabButton, { borderRightWidth: 0 }]}>
              Employees
            </Text>
          </Pressable>
        </View>
        {tab === 1 ? <RouteForRide /> : <Employee />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  idBlock: {
    borderBottomWidth: 1,
    borderColor: "grey",
    padding: 10,
  },
  idText: {
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
    flexDirection: "row",
    marginTop: 20,
    paddingVertical: 10,
    gap: 1,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#FFFF",
    marginRight: "auto",
  },
  tabButton: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: "black",
    fontWeight: "600",
    borderRightWidth: 2,
  },
});

export default Home;
