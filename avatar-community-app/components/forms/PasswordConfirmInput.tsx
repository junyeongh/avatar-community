import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "@/components/ui/InputField";

export default function PasswordConfirmInput() {
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
            error={error?.message}
          />
        </>
      )}
    />
  );
}
