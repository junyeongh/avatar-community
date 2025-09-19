import InputField from "@/components/InputField";
import { StyleSheet, View } from "react-native";

export default function LogInScreen() {
  return (
    <View style={styles.container}>
      <InputField
        label="E-mail"
        placeholder="Please input your email."
        inputMode="email"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
});
