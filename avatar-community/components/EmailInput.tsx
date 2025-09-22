import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function EmailInput() {
  const { control } = useFormContext();

  return (
    <Controller
      name="email"
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          label="E-mail"
          placeholder="Please input your email."
          inputMode="email"
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
