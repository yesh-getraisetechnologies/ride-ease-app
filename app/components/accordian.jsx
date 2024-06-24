import React from "react";
import { View, Pressable } from "react-native";

const AccordianWrapper = ({
  isOpen,
  toggleCheckbox,
  titleView,
  descView,
  mainViewStyle,
}) => {
  return (
    <View style={mainViewStyle}>
      <Pressable onPress={toggleCheckbox}>{titleView}</Pressable>
      {isOpen && descView}
    </View>
  );
};

export default AccordianWrapper;
