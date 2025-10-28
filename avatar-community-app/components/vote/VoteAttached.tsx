import { Ionicons } from "@expo/vector-icons";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";

import InputField from "@/components/ui/InputField";

export default function VoteAttached() {
  const { control, setValue, resetField } = useFormContext();
  const [isVoteAttached] = useWatch({ control, name: ["isVoteAttached"] });

  return (
    <>
      {isVoteAttached && (
        <InputField
          variant='outlined'
          editable={false}
          value='A vote is attached'
          rightChild={
            <Pressable
              onPress={() => {
                setValue("isVoteAttached", false);
                resetField("voteOptions");
              }}
            >
              <Ionicons name='close' />
            </Pressable>
          }
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
