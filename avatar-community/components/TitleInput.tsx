import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

interface TitleInputProps {}

export default function TitleInput({}: TitleInputProps) {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="email"
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="Title"
          placeholder="Please input the title."
          submitBehavior="submit"
          returnKeyType="next"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus("description")}
          error={error?.message}
        />
      )}
    />
  );
}
