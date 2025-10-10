interface User {
  id: number;
  nickname: string;
  imageUri?: string;
}

export interface Profile extends User {
  email: string;
  introduce?: string;
  hatId: string;
  handId: string;
  skinId: string;
  topId: string;
  faceId: string;
  bottomId: string;
  background: string;
}

export interface ImageUri {
  id?: number;
  uri: string;
}

export interface VoteOption {
  id?: number;
  displayPriority: number;
  content: string;
}

export interface CreatePostDto {
  title: string;
  description: string;
  imageUris: ImageUri[];
  voteTitle?: string;
  voteOptions?: VoteOption[];
}

export interface CreateCommentDto {
  content: string;
  postId: number;
  parentCommentId?: number;
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
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: User;
  isDeleted: boolean;
}

export interface PostComment extends Comment {
  replies: Comment[];
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
  author: User;
  imageUris: ImageUri[];
  likes: { userId: number }[];
  hasVote: boolean;
  voteCount: number;
  commentCount: number;
  viewCount: number;
  votes?: PostVote[];
  comments?: PostComment[];
}
