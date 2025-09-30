import { Link, router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/ui/Button";

export default function AuthHome() {
  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label='Sign in with E-mail'
          onPress={() => router.push("/auth/signin")}
        />
        <Link href={"/auth/signup"} style={styles.signUpText}>
          Sign up with E-mail
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  logo: {
    width: 112,
    height: 112,
  },
  signUpText: {
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
