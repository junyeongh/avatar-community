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
      render={({ field: { value, onChange } }) => (
        <InputField
          label="Password"
          placeholder="Please input your password."
          // secureTextEntry={true}
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
}
