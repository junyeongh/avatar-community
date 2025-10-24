export interface VoteOption {
  id?: number;
  displayPriority: number;
  content: string;
}

export interface CreateVoteDto {
  postId: number;
  voteOptionId: number;
}

export type PostVoteOption = VoteOption & { userVotes: { userId: number }[] };

export interface PostVote {
  id: number;
  title: string;
  options: PostVoteOption[];
}
