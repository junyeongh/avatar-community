import { Ionicons } from "@expo/vector-icons";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";

import InputField from "@/components/ui/InputField";
import { colors } from "@/constants";

interface VoteInputProps {
  index: number;
  onRemove: () => void;
}

export default function VoteInput({ index, onRemove }: VoteInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={`voteOptions.${index}.content`}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          variant='standard'
          value={value}
          onChangeText={onChange}
          error={error?.message}
          rightChild={
            <Pressable onPress={onRemove}>
              <Ionicons name='close' size={20} color={colors.BLACK} />
            </Pressable>
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
