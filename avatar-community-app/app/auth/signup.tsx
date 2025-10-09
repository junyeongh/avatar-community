import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import EmailInput from "@/components/auth/EmailInput";
import PasswordConfirmInput from "@/components/auth/PasswordConfirmInput";
import PasswordInput from "@/components/auth/PasswordInput";
import FixedBottomCTA from "@/components/hoc/FixedBottomCTA";
import KeyboardAvoidingViewWrapper from "@/components/hoc/KeyboardAvoidingViewWrapper";
import { useAuth } from "@/hooks/queries/useAuth";

const schema = z
  .object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

type SignupFormValues = z.infer<typeof schema>;

export default function SignUpScreen() {
  const { signupMutation } = useAuth();

  const signUpForm = useForm<SignupFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (formValues) => {
    console.log("formValues", formValues);
    const { email, password } = formValues;
    signupMutation.mutate({ email, password });
  };

  const handleSubmitEditing = signUpForm.handleSubmit(onSubmit);

  return (
    <FormProvider {...signUpForm}>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
        <KeyboardAvoidingViewWrapper>
          <View style={styles.container}>
            <EmailInput />
            <PasswordInput
              submitBehavior='submit'
              returnKeyType='next'
              handleSubmitEditing={() => signUpForm.setFocus("passwordConfirm")}
            />
            <PasswordConfirmInput handleSubmitEditing={handleSubmitEditing} />
          </View>
          <FixedBottomCTA
            label='Sign up'
            onPress={signUpForm.handleSubmit(onSubmit)}
          />
        </KeyboardAvoidingViewWrapper>
      </SafeAreaView>
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
