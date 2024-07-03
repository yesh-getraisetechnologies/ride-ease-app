import React from "react";
import { AuthProvider } from "./context/authContext";
import App from "./app";
import Toast from 'react-native-toast-message';

export default function Root() {
  return (
    <AuthProvider>
      <App />
      <Toast />
    </AuthProvider>
  );
}
