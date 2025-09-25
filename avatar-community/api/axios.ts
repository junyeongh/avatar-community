import axios from "axios";
import { Platform } from "react-native";

export const baseUrls = {
  android: "http://100.73.86.16:3030",
  ios: "http://localhost:3030",
};

export const axiosInstance = axios.create({
  baseURL: Platform.OS === "android" ? baseUrls.android : baseUrls.ios,
});
