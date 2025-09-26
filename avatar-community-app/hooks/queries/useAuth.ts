import { getMe, postSignin, postSignup } from "@/api/auth";
import { queryClient } from "@/api/queryClient";
import { removeHeader, setHeader } from "@/utils/header";
import { deleteSecureStore, getSecureStore, setSecureStore } from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore("accessToken");
        setHeader("Authorization", `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
}

function useSignin() {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await setSecureStore("accessToken", accessToken);

      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] });
      router.replace("/");
    },
    onError: () => {},
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/signin"),
    onError: () => {},
  });
}

export function useAuth() {
  const { data } = useGetMe();
  const signinMutation = useSignin();
  const signupMutation = useSignup();

  const logout = () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: ["auth"] });
  };

  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
    },
    signinMutation,
    signupMutation,
    logout,
  };
}
