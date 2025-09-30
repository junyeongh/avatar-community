import FixedBottomCTA from "@/components/hoc/FixedBottomCTA";
import EmailInput from "@/components/forms/EmailInput";
import PasswordInput from "@/components/forms/PasswordInput";
import { useAuth } from "@/hooks/queries/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

const schema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type SigninFormValues = z.infer<typeof schema>;

export default function SignInScreen() {
  const { signinMutation } = useAuth();

  const signInForm = useForm<SigninFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SigninFormValues> = (formValues) => {
    console.log("formValues", formValues);
    const { email, password } = formValues;
    signinMutation.mutate({ email, password });
  };

  return (
    <FormProvider {...signInForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedBottomCTA
        label='Sign in'
        onPress={signInForm.handleSubmit(onSubmit)}
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
