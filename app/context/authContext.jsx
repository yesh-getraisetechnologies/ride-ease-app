import React, { createContext, useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [allActiveTrip, setAllActiveTrip] = useState(null);

  const logout = async () => {
    try {
      setToken(null);
      setUserData(null);
      setAllActiveTrip(null);
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const saveToken = async (token) => {
    try {
      setToken(token);
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to fetch token", error);
    }
  };

  const saveUserData = async (userData) => {
    try {
      setUserData(userData);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const saveAllActiveTrip = async (activeTrip) => {
    try {
      setAllActiveTrip(activeTrip);
      await AsyncStorage.setItem("activeTrip", JSON.stringify(activeTrip));
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setToken(token);
      }
    };
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    };
    const loadAllActiveTrip = async () => {
      const allActiveTrip = await AsyncStorage.getItem("activeTrip");
      if (allActiveTrip) {
        setAllActiveTrip(JSON.parse(allActiveTrip));
      }
    };

    const loadData = async () => {
      await Promise.all([loadToken(), loadUserData(), loadAllActiveTrip()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        allActiveTrip,
        logout,
        saveToken,
        saveUserData,
        saveAllActiveTrip,
      }}
    >
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#FF6961" />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
