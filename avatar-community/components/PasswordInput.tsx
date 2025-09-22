import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function PasswordInput() {
  const [shouldHidePassword, setShouldHidePassword] = useState(true);
  const { control } = useFormContext();

  return (
    <Controller
      name="password"
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          label="Password"
          placeholder="Please input your password."
          // secureTextEntry={shouldHidePassword}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
