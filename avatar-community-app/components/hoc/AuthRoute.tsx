import { router, useFocusEffect } from "expo-router";

import { useAuth } from "@/hooks/queries/useAuth";

interface AuthRouteProps {
  children: React.ReactNode;
}

export default function AuthRoute({ children }: AuthRouteProps) {
  const { auth } = useAuth();
  const isLoggedIn = !!auth.id;

  useFocusEffect(() => {
    !isLoggedIn && router.replace("/auth");
  });

  return <>{children}</>;
}
