import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  // ActivityIndicator,
} from "react-native";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

const Login = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.bgImage}
          source={require("../assets/images/backgroundHome.png")}
        >
          <Image
            source={require("../assets/images/logo1.png")}
            style={styles.logo}
          />
        </ImageBackground>
      </View>
      <View style={styles.innerContainer}>
        <Image
          source={require("../assets/images/heart.png")}
          style={styles.heartImg}
        />
        <Text style={styles.title}>Find your partner</Text>
        <Text style={styles.subtitle}>
          Let there be spaces in your togetherness. And let the winds of the
          heavens dance between you.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonEmail}
            onPress={() => navigation.navigate("loginEmail")}
          >
            <Text style={styles.buttonText}>Email Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMobile}
            onPress={() => navigation.navigate("loginMobile")}
          >
            <Text style={styles.buttonMobileText}>Mobile Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>Or</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={styles.createAccountText}>Create New Account?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6961",
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 250,
    height: 250,
    marginHorizontal: "auto",
    marginTop: 15,
  },
  bgImage: {
    width: "100%",
    height: 400,
  },
  innerContainer: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: "auto",
  },
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 5,
  },
  or: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#fff",
  },
  buttonEmail: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  buttonMobile: {
    backgroundColor: "#ACACAC",
    color: "#fff",
    fontSize: 16,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  buttonMobileText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonText: {
    color: "#FF6961",
    fontSize: 16,
  },
  orText: {
    color: "#fff",
    marginBottom: 20,
  },
  createAccountText: {
    color: "#FFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default Login;
