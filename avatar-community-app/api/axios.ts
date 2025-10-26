import axios from "axios";
import { Platform } from "react-native";

const baseUrls = {
  // android: "http://100.73.86.16:3030", // tailscale
  android: "http://192.168.8.204:3030", // local ip
  ios: "http://localhost:3030",
};

export const baseUrl =
  Platform.OS === "android" ? baseUrls.android : baseUrls.ios;

export const axiosInstance = axios.create({
  baseURL: Platform.OS === "android" ? baseUrls.android : baseUrls.ios,
});
