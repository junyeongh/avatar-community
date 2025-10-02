import { useMutation } from "@tanstack/react-query";

import { uploadImages } from "@/api/image";

export function useUploadImages() {
  return useMutation({
    mutationFn: uploadImages,
  });
}
