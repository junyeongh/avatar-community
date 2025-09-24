import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

interface DescriptionInputProps {}

export default function DescriptionInput({}: DescriptionInputProps) {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="description"
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          autoFocus
          label="Description"
          placeholder="Please description the title."
          returnKeyType="next"
          value={value}
          onChangeText={onChange}
          error={error?.message}
          multiline
        />
      )}
    />
  );
}
