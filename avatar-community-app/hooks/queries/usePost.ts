import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

import {
  createPost,
  createVote,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
} from "@/api/post";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Post, Profile } from "@/types";

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export function useGetPost(id: number) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    enabled: Boolean(id),
  });
}

export function useGetInfinitePosts() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}

export function useUpdatePost() {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (postId) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      router.back();
    },
  });
}

export function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export function useCreateVote() {
  return useMutation({
    mutationFn: createVote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, data.postId],
      });
    },
  });
}

export function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    // https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });

      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);
      const userId = Number(user?.id);

      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POST,
        postId,
      ]);
      const newPost = { ...previousPost };
      console.log("previousPost", previousPost);

      const likedIndex =
        previousPost?.likes.findIndex((like) => like.userId === userId) ?? -1;

      likedIndex >= 0
        ? newPost.likes?.splice(likedIndex, 1)
        : newPost.likes?.push({ userId: userId });

      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, postId],
        newPost,
      );

      return { previousPost, newPost };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, context?.newPost?.id],
        context?.previousPost,
      );
    },
    // onError: (err, newPost, onMutationResult, context) => {
    //   context.client.setQueryData(
    //     [
    //       queryKeys.POST,
    //       queryKeys.GET_POST,
    //       onMutationResult?.previousPost?.id,
    //     ],
    //     onMutationResult?.previousPost,
    //   );
    // },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, variables],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
    // onSettled: (data, error, variables, onMutationResult, context) => {
    //   context.client.invalidateQueries({
    //     queryKey: [queryKeys.POST, queryKeys.GET_POST, variables],
    //   });
    //   context.client.invalidateQueries({
    //     queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    //   });
    // },
  });
}
