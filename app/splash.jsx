import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";

export default function SplashScreen() {
  const navigation = useNavigation();
  const waveTranslateY = useRef(new Animated.Value(-500)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(waveTranslateY, {
      toValue: 50,
      duration: 1700,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    });

    const timeoutId = setTimeout(() => {
      navigation.replace("home");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [waveTranslateY, logoOpacity, navigation]);

  return (
    <LinearGradient
      colors={["#FF8C88", "#FDAE9A"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Animated.Image
        source={require('../assets/images/curve.png')}
        style={[styles.waveImage, { transform: [{ translateY: waveTranslateY }] }]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("../assets/images/logo1.png")}
        style={[styles.logo, { opacity: logoOpacity }]}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  waveImage: {
    position: "absolute",
    width: "100%",
    height: '100%',
    top: -250,
  },
  logo: {
    width: 300,
    height: '40%',
    alignSelf: "center",
    top: 20
  },
});
