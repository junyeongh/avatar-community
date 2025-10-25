import { PostComment } from "./comment";
import { User } from "./user";
import { PostVote, VoteOption } from "./vote";

export interface ImageUri {
  id?: number;
  uri: string;
}

export interface CreatePostDto {
  title: string;
  description: string;
  imageUris: ImageUri[];
  voteTitle?: string;
  voteOptions?: VoteOption[];
}

export interface PostLike {
  userId: number;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
  author: User;
  imageUris: ImageUri[];
  likes: PostLike[];
  hasVote: boolean;
  voteCount: number;
  commentCount: number;
  viewCount: number;
  votes?: PostVote[];
  comments?: PostComment[];
}
