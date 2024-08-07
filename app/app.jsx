import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./context/authContext";
import Login from "./screen/login";
import Home from "./screen/home";
import ActiveTrip from "./screen/activeTrip";

const Stack = createStackNavigator();

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={token ? "home" : "login"}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="activeTrip"
          component={ActiveTrip}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
