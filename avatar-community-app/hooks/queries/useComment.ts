import { useMutation } from "@tanstack/react-query";

import { createComment, deleteComment } from "@/api/comment";
import { queryClient } from "@/api/queryClient";
import { queryKeys } from "@/constants";

export function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
    },
  });
}

export function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (postId: number) => {
      queryKey: [queryKeys.POST, queryKeys.GET_POST, postId];
    },
  });
}
