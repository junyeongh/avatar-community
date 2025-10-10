import { Feather } from "@expo/vector-icons";
import { Fragment, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import VoteOption from "@/components/vote/VoteOption";
import { colors } from "@/constants";
import { useAuth } from "@/hooks/queries/useAuth";
import { useCreateVote } from "@/hooks/queries/usePost";
import { PostVote } from "@/types";

interface VoteItemProps {
  postId: number;
  postVotes: PostVote[];
  voteCount: number;
}

export default function VoteItem({
  postId,
  postVotes,
  voteCount,
}: VoteItemProps) {
  const [selectedOption, setSelectedOption] = useState<number>();

  const { auth } = useAuth();
  const createVote = useCreateVote();

  const handleVote = () => {
    createVote.mutate({ postId: postId, voteOptionId: Number(selectedOption) });
  };

  return (
    <View style={styles.container}>
      <View style={styles.voteCountContainer}>
        <Text style={styles.labelTitleText}>Vote</Text>
        <Feather
          name='user'
          size={14}
          color={colors.BLACK}
          style={{ paddingLeft: 8 }}
        />
        <Text style={styles.labelCountText}>{voteCount} has participated</Text>
      </View>
      <Text>{postId}</Text>
      {postVotes.map((vote) => {
        const voteUserIds = vote.options.flatMap((option) =>
          option.userVotes.map((userVote) => userVote.userId),
        );
        const hasVoted = voteUserIds.includes(Number(auth.id));

        return (
          <Fragment key={vote.id}>
            {vote.options.map((option) => (
              <VoteOption
                key={option.id}
                option={option}
                totalCount={voteCount}
                hasVoted={hasVoted}
                isSelected={option.id === selectedOption}
                onSelectOption={() => setSelectedOption(Number(option.id))}
              />
            ))}
            {!hasVoted && (
              <Button
                label='Submit'
                disabled={!selectedOption}
                onPress={handleVote}
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 8,
    padding: 16,
    gap: 15,
  },
  // vote count container
  voteCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  labelTitleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  labelCountText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.BLACK,
  },
  //
  voteOptionsContainer: {
    flexDirection: "row",
    gap: 4,
  },
});
