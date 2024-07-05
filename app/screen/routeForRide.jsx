import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Feather, FontAwesome, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";
import Toast from "react-native-toast-message";
import { HttpClient } from "../server/http";
import { useNavigation } from "expo-router";
import openGoogleMaps from "../components/openGoogleMaps";

const RouteForRide = () => {
  const { allActiveTrip } = useContext(AuthContext);
  const navigation = useNavigation();

  const CompleteTrip = async () => {
    try {
      await HttpClient.post("/trips/complete-trip", {
        tripId: allActiveTrip[0]?.tripId,
      });
      Toast.show({
        type: "success",
        text1: "Your Trip has been completed.",
      });
      navigation.navigate("home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error Message!",
        text2: error?.data?.message,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          data={allActiveTrip}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <View key={index}>
              <View style={styles.row}>
                <Icon name="location-on" size={20} color="#65696D" />
                <Text style={styles.text}>
                  {item?.employeeName.length > 20
                    ? item?.employeeName.slice(0, 20) + "..."
                    : item?.employeeName}
                </Text>
                <Feather name="navigation" size={18} color="#1E88E5" />
                {item?.isVerified ? (
                  <FontAwesome name="check-circle" size={18} color="#7BCB00" />
                ) : (
                  <Entypo name="circle-with-cross" size={18} color="red" />
                )}
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>|</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.row}>
          <Feather name="navigation" size={18} color="#1E88E5" />
          {allActiveTrip ? (
            <Text style={styles.text}>
              {allActiveTrip[allActiveTrip.length - 1].pickAddress}
            </Text>
          ) : (
            ""
          )}
        </View>
        <View style={styles.buttonView}>
          <Pressable onPress={() => openGoogleMaps(allActiveTrip)}>
            <View style={styles.submitButton}>
              <Feather name="navigation" size={18} color="#FFF" />
              <Text style={styles.buttonText}>Navigate</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => CompleteTrip()}>
            <View style={styles.submitButton}>
              <Text style={styles.buttonText}>Complete Trip</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 5,
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: "black",
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

export default RouteForRide;
