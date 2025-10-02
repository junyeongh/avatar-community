import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";

import KeyboardAvoidingScrollView from "@/components/hoc/KeyboardAvoidingScrollView";
import DescriptionInput from "@/components/post/DescriptionInput";
import ImagePreviewList from "@/components/post/ImagePreviewList";
import { PostWriteFooter } from "@/components/post/PostWriteFooterInput";
import TitleInput from "@/components/post/TitleInput";
import Button from "@/components/ui/Button";
import { useCreatePost } from "@/hooks/queries/usePost";
import { ImageUri } from "@/types";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  imageUris: z.array(z.custom<ImageUri>()),
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
    },
  });
  // console.log("postForm", postForm.watch().imageUris);

  return (
    <FormProvider {...postForm}>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
        <KeyboardAvoidingScrollView scrollViewRef={scrollViewRef}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16, gap: 16 }}
          >
            <TitleInput />
            <DescriptionInput />
            <ImagePreviewList imageUris={postForm.watch().imageUris} />
          </ScrollView>
        </KeyboardAvoidingScrollView>
        <PostWriteFooter />
      </SafeAreaView>
    </FormProvider>
  );
}
