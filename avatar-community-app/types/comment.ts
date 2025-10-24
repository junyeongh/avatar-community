import { User } from "./user";

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

export interface CreateCommentDto {
  content: string;
  postId: number;
  parentCommentId?: number;
}
