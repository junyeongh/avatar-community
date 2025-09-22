import EmailInput from "@/components/EmailInput";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import PasswordConfirmInput from "@/components/PasswordConfirmInput";
import PasswordInput from "@/components/PasswordInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpScreen() {
  const signUpForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    console.log("formValues", formValues);
  };

  return (
    <FormProvider {...signUpForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
        <PasswordConfirmInput />
      </View>
      <FixedBottomCTA
        label="Sign up"
        onPress={signUpForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
