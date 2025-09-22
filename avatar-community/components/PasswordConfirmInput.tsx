import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function PasswordConfirmInput() {
  const [shouldHidePassword, setShouldHidePassword] = useState(true);
  const { control } = useFormContext();

  return (
    <Controller
      name="passwordConfirm"
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <InputField
            label="Confirm password"
            placeholder="Please confirm your password."
            // secureTextEntry={shouldHidePassword}
            value={value}
            onChangeText={onChange}
            error={error?.message}
          />
        </>
      )}
    />
  );
}
