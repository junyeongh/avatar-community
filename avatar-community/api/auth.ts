import { Profile } from "@/types";
import { getSecureStore } from "@/utils/secureStore";
import { axiosInstance } from "./axios";

type UserRequestBody = {
  email: string;
  password: string;
};

export async function postSignup(body: UserRequestBody): Promise<void> {
  const { data } = await axiosInstance.post("/auth/signup", body);
  // const response = await fetch("/auth/signup", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(body),
  // });

  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  // const data = await response.json();

  return data;
}

export async function postSignin(body: UserRequestBody): Promise<{ accessToken: string }> {
  const { data } = await axiosInstance.post("/auth/signin", body);

  return data;
}

export async function getMe(): Promise<Profile> {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}
