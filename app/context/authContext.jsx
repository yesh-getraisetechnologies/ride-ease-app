import React, { createContext, useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [allActiveTrip, setAllActiveTrip] = useState(null);

  const login = async ({ token, userData }) => {
    try {
      setToken(token);
      setUserData(userData);
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setUserData(null);
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.error("Failed to fetch token", error);
    }
  };

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const saveAllActiveTrip = async (data) => {
    try {
      setAllActiveTrip(data)
      const value = await AsyncStorage.setItem("activeTrip", JSON.stringify(data));
      if (value !== null) {
        return value;
      }
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
        setToken(JSON.parse(userData));
      }
    };
    const loadAllActiveTrip = async () => {
      const allActiveTrip = await AsyncStorage.getItem("activeTrip");
      if (allActiveTrip) {
        setAllActiveTrip(JSON.parse(allActiveTrip));
      }
    };
    loadToken();
    loadUserData();
    loadAllActiveTrip();
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        allActiveTrip,
        login,
        logout,
        getToken,
        getUserData,
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
