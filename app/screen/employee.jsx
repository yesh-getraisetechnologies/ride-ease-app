import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Employee() {
  return (
    <View style={styles.mainView}>
      <View style={styles.listView}>
        <Text>Ravi Shankar - 9887764567</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Feather name="phone-call" size={18} color="#1E88E5" />
          <AntDesign name="pluscircleo" size={18} color="black" />
        </View>
      </View>
      <View style={styles.listView}>
        <Text>Ravi Shankar - 9887764567</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Feather name="phone-call" size={18} color="#1E88E5" />
          <AntDesign name="pluscircleo" size={18} color="black" />
        </View>
      </View>
      <View style={styles.listView}>
        <Text>Ravi Shankar - 9887764567</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Feather name="phone-call" size={18} color="#1E88E5" />
          <AntDesign name="pluscircleo" size={18} color="black" />
        </View>
      </View>
      <View style={styles.listView}>
        <Text>Ravi Shankar - 9887764567</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Feather name="phone-call" size={18} color="#1E88E5" />
          <AntDesign name="pluscircleo" size={18} color="black" />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    marginVertical: 40,
    marginHorizontal: 10,
    gap: 5,
  },
  listView: {
    backgroundColor: "#E8EEF4",
    borderRadius: 50,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
