import FixedBottomCTA from "@/components/FixedBottomCTA";
import InputField from "@/components/InputField";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignUpScreen() {
  const [signUpValues, setSignUpValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChangeInput = (text: string, fieldName: string) => {
    setSignUpValues((prev) => ({ ...prev, [fieldName]: text }));
  };

  const handleSubmit = () => {
    console.log(signUpValues);
    if (signUpValues.email.length === 0) {
      setError((prev) => ({ ...prev, email: "Please type your email." }));
    }
  };

  return (
    <>
      <View style={styles.container}>
        <InputField
          label="E-mail"
          placeholder="Please input your email."
          inputMode="email"
          value={signUpValues.email}
          onChangeText={(text) => handleChangeInput(text, "email")}
          error={error.email}
        />
        <InputField
          label="Password"
          placeholder="Please input your password."
          secureTextEntry={true}
          value={signUpValues.password}
          onChangeText={(text) => handleChangeInput(text, "password")}
        />
        <InputField
          label="Confirm password"
          placeholder="Please confirm your password."
          secureTextEntry={true}
          value={signUpValues.passwordConfirm}
          onChangeText={(text) => handleChangeInput(text, "passwordConfirm")}
        />
      </View>
      <FixedBottomCTA label="Sign up" onPress={handleSubmit} />
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
