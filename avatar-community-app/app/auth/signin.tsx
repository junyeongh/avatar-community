import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

import EmailInput from "@/components/auth/EmailInput";
import PasswordInput from "@/components/auth/PasswordInput";
import FixedBottomCTA from "@/components/hoc/FixedBottomCTA";
import KeyboardAvoidingViewWrapper from "@/components/hoc/KeyboardAvoidingViewWrapper";
import { useAuth } from "@/hooks/queries/useAuth";
import usePushNotification from "@/hooks/usePushNotification";

const schema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type SigninFormValues = z.infer<typeof schema>;

export default function SignInScreen() {
  const { signinMutation } = useAuth();
  const { expoPushToken } = usePushNotification();

  const signInForm = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SigninFormValues> = (formValues) => {
    signinMutation.mutate({ ...formValues, expoPushToken });
  };

  const handleSubmitEditing = signInForm.handleSubmit(onSubmit);

  return (
    <FormProvider {...signInForm}>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
        <KeyboardAvoidingViewWrapper>
          <View style={styles.container}>
            <EmailInput />
            <PasswordInput handleSubmitEditing={handleSubmitEditing} />
          </View>
          <FixedBottomCTA
            label='Sign in'
            onPress={signInForm.handleSubmit(onSubmit)}
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
