import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import EmailInput from "@/components/forms/EmailInput";
import PasswordInput from "@/components/forms/PasswordInput";
import FixedBottomCTA from "@/components/hoc/FixedBottomCTA";
import KeyboardAvoidingScrollView from "@/components/hoc/KeyboardAvoidingScrollView";
import { useAuth } from "@/hooks/queries/useAuth";

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

  const handleSubmitEditing = signInForm.handleSubmit(onSubmit);

  return (
    <FormProvider {...signInForm}>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
        <KeyboardAvoidingScrollView>
          <View style={styles.container}>
            <EmailInput />
            <PasswordInput handleSubmitEditing={handleSubmitEditing} />
          </View>
          <FixedBottomCTA
            label='Sign in'
            onPress={signInForm.handleSubmit(onSubmit)}
          />
        </KeyboardAvoidingScrollView>
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
