import FixedBottomCTA from "@/components/FixedBottomCTA";
import InputField from "@/components/InputField";
import { StyleSheet, View } from "react-native";

export default function SignInScreen() {
  return (
    <>
      <View style={styles.container}>
        <InputField
          label="E-mail"
          placeholder="Please input your email."
          inputMode="email"
        />
        <InputField
          label="Password"
          placeholder="Please input your password."
          inputMode="email"
        />
      </View>
      <FixedBottomCTA label="Sign in" onPress={() => {}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
