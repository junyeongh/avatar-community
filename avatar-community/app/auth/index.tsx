import Button from "@/components/CustomButton";
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthHome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button label="Sign in with E-mail" />
        <Link href={"/"} style={styles.signUpText}>
          Sign up with E-mail
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "blue",
    flex: 1,
  },
  imageContainer: {
    // backgroundColor: "red",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    // backgroundColor: "yellow",
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
