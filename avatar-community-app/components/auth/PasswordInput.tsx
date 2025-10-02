import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, TextInputProps } from "react-native";

import InputField from "@/components/ui/InputField";
import { colors } from "@/constants";

interface PasswordInputProps {
  submitBehavior?: TextInputProps["submitBehavior"];
  returnKeyType?: TextInputProps["returnKeyType"];
  handleSubmitEditing: () => void;
}

export default function PasswordInput({
  submitBehavior = "blurAndSubmit",
  returnKeyType = "default",
  handleSubmitEditing,
}: PasswordInputProps) {
  const [shouldHidePassword, setShouldHidePassword] = useState(true);
  const { control } = useFormContext();

  return (
    <Controller
      name='password'
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label='Password'
          placeholder='Please input your password.'
          secureTextEntry={shouldHidePassword}
          textContentType='password'
          returnKeyType={returnKeyType}
          submitBehavior={submitBehavior}
          onSubmitEditing={handleSubmitEditing}
          value={value}
          onChangeText={onChange}
          error={error?.message}
          rightChild={
            <Pressable onPress={() => setShouldHidePassword((prev) => !prev)}>
              {shouldHidePassword ? (
                <Ionicons
                  name='eye-outline'
                  size={24}
                  color={colors.GRAY_500}
                />
              ) : (
                <Ionicons
                  name='eye-off-outline'
                  size={24}
                  color={colors.GRAY_500}
                />
              )}
            </Pressable>
          }
        />
      )}
    />
  );
}
