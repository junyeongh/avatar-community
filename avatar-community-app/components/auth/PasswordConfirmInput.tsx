import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable } from "react-native";

import InputField from "@/components/ui/InputField";
import { colors } from "@/constants";

interface PasswordConfirmInputProps {
  handleSubmitEditing: () => void;
}

export default function PasswordConfirmInput({
  handleSubmitEditing,
}: PasswordConfirmInputProps) {
  const [shouldHidePassword, setShouldHidePassword] = useState(true);
  const { control } = useFormContext();

  return (
    <Controller
      name='passwordConfirm'
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <>
          <InputField
            ref={ref}
            label='Confirm password'
            placeholder='Please confirm your password.'
            secureTextEntry={shouldHidePassword}
            textContentType='password'
            value={value}
            onChangeText={onChange}
            onSubmitEditing={handleSubmitEditing}
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
        </>
      )}
    />
  );
}
