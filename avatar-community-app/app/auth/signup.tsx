import FixedBottomCTA from "@/components/composite/FixedBottomCTA";
import EmailInput from "@/components/forms/EmailInput";
import PasswordConfirmInput from "@/components/forms/PasswordConfirmInput";
import PasswordInput from "@/components/forms/PasswordInput";
import { useAuth } from "@/hooks/queries/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

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

  return (
    <FormProvider {...signUpForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput submitBehavior='submit' returnKeyType='next' />
        <PasswordConfirmInput />
      </View>
      <FixedBottomCTA
        label='Sign up'
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
