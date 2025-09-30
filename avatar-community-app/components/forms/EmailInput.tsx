import { Controller, useFormContext } from "react-hook-form";

import InputField from "@/components/ui/InputField";

export default function EmailInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name='email'
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label='E-mail'
          placeholder='Please input your email.'
          inputMode='email'
          returnKeyType='next'
          submitBehavior='submit'
          onSubmitEditing={() => setFocus("password")}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
