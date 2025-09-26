import { useAuth } from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";

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
