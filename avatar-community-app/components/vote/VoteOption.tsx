import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants";
import { PostVoteOption } from "@/types";

interface VoteOptionProps {
  option: PostVoteOption;
  totalCount: number;
  hasVoted: boolean;
  isSelected: boolean;
  onSelectOption: () => void;
}

export default function VoteOption({
  option,
  totalCount,
  hasVoted,
  isSelected,
  onSelectOption,
}: VoteOptionProps) {
  const percentage = option.userVotes.length
    ? Math.floor(option.userVotes.length / totalCount) * 100
    : 0;

  return (
    <>
      {hasVoted ? (
        <View
          style={[
            styles.container,
            {
              borderWidth: 0,
              backgroundColor: colors.ORANGE_200,
            },
          ]}
        >
          <View style={[styles.percentage, { width: `${percentage}%` }]} />
          <Text style={styles.percentageText}>{option.content}</Text>
          <Text style={styles.percentageText}>
            {percentage}% ({option.userVotes.length})
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={onSelectOption}
          style={
            isSelected
              ? [styles.container, { borderColor: colors.ORANGE_600 }]
              : [styles.container, { borderColor: colors.GRAY_300 }]
          }
        >
          <Text style={styles.content}>{option.content}</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  content: {
    marginLeft: 12,
  },
  percentage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: colors.ORANGE_300,
  },
  percentageText: {
    marginHorizontal: 16,
    fontWeight: "500",
  },
});
