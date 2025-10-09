import { Feather } from "@expo/vector-icons";
import { useRef } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import VoteInput from "@/components/vote/VoteInput";
import { colors } from "@/constants";
import { VoteOption } from "@/types";

import KeyboardAvoidingViewWrapper from "../hoc/KeyboardAvoidingViewWrapper";

interface VoteModalProps {}

export default function VoteModal({}: VoteModalProps) {
  const scrollViewRef = useRef<ScrollView | null>(null);

  const { control, setValue } = useFormContext();
  const [isVoteOpen, voteOptions] = useWatch({
    control,
    name: ["isVoteOpen", "voteOptions"],
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "voteOptions",
  });

  const handleAppendVote = () => {
    const priority = voteOptions.map(
      (voteOption: VoteOption) => voteOption.displayPriority,
    );
    const nextPriority = Math.max(...priority) + 1;

    append({ displayPriority: nextPriority, content: "" });
  };

  const handleSubmitVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert("At least two vote options are required");
      return;
    }

    setValue("isVoteAttached", true);
    setValue("isVoteOpen", false);
  };

  return (
    <Modal visible={isVoteOpen} animationType='slide'>
      <SafeAreaView
        style={styles.container}
        edges={["bottom", "left", "right"]}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.headerLeft}
            onPress={() => {
              setValue("isVoteOpen", false);
            }}
          >
            <Feather name='arrow-left' size={28} color={colors.BLACK} />
          </Pressable>
          <Text style={styles.headerTitle}>Vote</Text>
          <Pressable onPress={handleSubmitVote}>
            <Text style={styles.headerRight}>Submit</Text>
          </Pressable>
        </View>
        <KeyboardAvoidingViewWrapper
          isModal={true}
          scrollViewRef={scrollViewRef}
        >
          <ScrollView
            contentContainerStyle={{ gap: 12, padding: 16 }}
            ref={scrollViewRef}
          >
            {fields.map((field, index) => {
              return (
                <VoteInput
                  key={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                />
              );
            })}
            <Pressable onPress={handleAppendVote}>
              <Text style={styles.addOptionText}>Add a new option</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingViewWrapper>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // container
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  // header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  // addOptionButton
  addOptionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.GRAY_500,
    textAlign: "center",
  },
});
