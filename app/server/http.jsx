import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Axios = axios.create({
  baseURL: "https://transport-server-f4kc.onrender.com/server",
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error?.response);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error?.response);
  }
);

export class HttpClient {
  static async get(url, params) {
    const response = await Axios.get(url, { params });
    return response?.data;
  }
  static async post(url, data, options) {
    const response = await Axios.post(url, data, options);
    return response?.data;
  }

  static async put(url, data) {
    const response = await Axios.put(url, data);
    return response?.data;
  }

  static async patch(url, data) {
    const response = await Axios.patch(url, data);
    return response?.data;
  }

  static async delete(url) {
    const response = await Axios.delete(url);
    return response?.data;
  }
}
