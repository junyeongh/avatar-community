import { router, useRouter } from "expo-router";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import z from "zod";

import { baseUrl } from "@/api/axios";
import FixedBottomCTA from "@/components/hoc/FixedBottomCTA";
import KeyboardAvoidingViewWrapper from "@/components/hoc/KeyboardAvoidingViewWrapper";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";

interface ProfileUpdateScreenProps {}

const schema = z.object({
  nickname: z.string().min(2),
  introduce: z.string(),
});
type ProfileFormValues = z.infer<typeof schema>;

export default function ProfileUpdateScreen({}: ProfileUpdateScreenProps) {
  const { auth, profileMutation } = useAuth();

  const profileForm = useForm<ProfileFormValues>({
    defaultValues: {
      nickname: auth.nickname,
      introduce: auth.introduce,
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (formValues) => {
    profileMutation.mutate(formValues, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Saved",
        });
      },
    });
  };

  return (
    <FormProvider {...profileForm}>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
        <KeyboardAvoidingViewWrapper>
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  auth.imageUri
                    ? {
                        uri: `${baseUrl}/${auth.imageUri}`,
                      }
                    : require("@/assets/images/default-avatar.png")
                }
                style={styles.avatar}
              />
              <Button
                size='medium'
                variant='outlined'
                label='Change avatar'
                style={{ position: "absolute", right: 0, bottom: 0 }}
                onPress={() => router.push("/profile/avatar")}
              />
            </View>
            <View style={styles.inputContainer}>
              {/* nickname input */}
              <Controller
                name='nickname'
                control={profileForm.control}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                  formState: {},
                }) => {
                  return (
                    <InputField
                      label='Nickname'
                      placeholder='Please input your nickname.'
                      inputMode='text'
                      returnKeyType='next'
                      submitBehavior='submit'
                      value={value}
                      onSubmitEditing={() => profileForm.setFocus("introduce")}
                      onChangeText={onChange}
                      error={error?.message}
                    />
                  );
                }}
              />
              {/* introduce input */}
              <Controller
                name='introduce'
                control={profileForm.control}
                render={({ field: { ref, onChange, value } }) => {
                  return (
                    <InputField
                      ref={ref}
                      label='Introduction'
                      placeholder='Please introduce yourself.'
                      returnKeyType='next'
                      value={value}
                      onChangeText={onChange}
                    />
                  );
                }}
              />
            </View>
          </View>
          <FixedBottomCTA
            label='Save'
            onPress={profileForm.handleSubmit(onSubmit)}
          />
        </KeyboardAvoidingViewWrapper>
      </SafeAreaView>
    </FormProvider>
  );
}

// MARK: Style
const styles = StyleSheet.create({
  container: { flex: 1, margin: 16 },
  // MARK: avatar
  avatarContainer: {
    alignItems: "center",
    marginTop: 16,
    // position: "relative",
  },
  avatar: {
    width: 154,
    height: 154,
    borderRadius: 154,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_500,
  },
  // MARK: input
  inputContainer: { gap: 16 },
});
