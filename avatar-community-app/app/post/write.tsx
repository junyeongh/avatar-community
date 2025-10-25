import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as z from "zod";

import KeyboardAvoidingViewWrapper from "@/components/hoc/KeyboardAvoidingViewWrapper";
import DescriptionInput from "@/components/post/DescriptionInput";
import ImagePreviewList from "@/components/post/ImagePreviewList";
import { PostWriteFooter } from "@/components/post/PostWriteFooterInput";
import TitleInput from "@/components/post/TitleInput";
import Button from "@/components/ui/Button";
import VoteAttached from "@/components/vote/VoteAttached";
import VoteModal from "@/components/vote/VoteModal";
import { useCreatePost } from "@/hooks/queries/usePost";
import { ImageUri, VoteOption } from "@/types";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  imageUris: z.array(z.custom<ImageUri>()),
  isVoteOpen: z.boolean(),
  isVoteAttached: z.boolean(),
  voteOptions: z
    .array(z.custom<VoteOption>())
    .min(2, "At least two vote options are required")
    .refine((options) =>
      options.every((option) => option.content.length >= 1, {
        message: "Vote option content is required",
      }),
    ),
});

type PostFormValues = z.infer<typeof schema>;

export default function PostWriteScreen() {
  const createPost = useCreatePost();

  const scrollViewRef = useRef<ScrollView | null>(null);

  const onSubmit = (formValues: PostFormValues) => {
    createPost.mutate(formValues);
  };

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label='Save'
          size='medium'
          variant='standard'
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  });

  const postForm = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      imageUris: [],
      isVoteOpen: false,
      isVoteAttached: false,
      voteOptions: [{ displayPriority: 0, content: "" }],
    },
  });

  return (
    <FormProvider {...postForm}>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
        <KeyboardAvoidingViewWrapper scrollViewRef={scrollViewRef}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16, gap: 16 }}
          >
            <TitleInput />
            <DescriptionInput />
            <VoteAttached />
            <ImagePreviewList imageUris={postForm.watch().imageUris} />
          </ScrollView>
        </KeyboardAvoidingViewWrapper>
        <PostWriteFooter />
        <VoteModal />
      </SafeAreaView>
    </FormProvider>
  );
}
