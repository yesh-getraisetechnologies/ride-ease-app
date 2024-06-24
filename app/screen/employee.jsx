import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AccordianWrapper from "../components/accordian";
import { FlatList } from "react-native";

export default function Employee() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const Array = [1, 2, 3, 4, 5];

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
            titleView={
              <View style={styles.listView}>
                <Text>Ravi Shankar - 9887764567</Text>
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
            descView={<Text>{item}</Text>}
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
  listView: {
    backgroundColor: "#E8EEF4",
    borderRadius: 50,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});
