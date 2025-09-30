import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";

import InputField from "@/components/ui/InputField";

interface PasswordInputProps {
  submitBehavior?: TextInputProps["submitBehavior"];
  returnKeyType?: TextInputProps["returnKeyType"];
}

export default function PasswordInput({
  submitBehavior = "blurAndSubmit",
  returnKeyType = "default",
}: PasswordInputProps) {
  const [shouldHidePassword, setShouldHidePassword] = useState(true);
  const { control, setFocus } = useFormContext();

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
          onSubmitEditing={() => setFocus("passwordConfirm")}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
