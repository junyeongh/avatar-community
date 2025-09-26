import { createPost, getPosts } from "@/api/post";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/")
      queryClient.invalidateQueries({queryKey:[queryKeys.POST, queryKeys.GET_POSTS]})
    },
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
