import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import z from "zod";

import DescriptionInput from "@/components/post/DescriptionInput";
import TitleInput from "@/components/post/TitleInput";
import Button from "@/components/ui/Button";
import { useGetPost, useUpdatePost } from "@/hooks/queries/usePost";
import useKeyboardOffset from "@/hooks/useKeyboardOffset";
import { ImageUri } from "@/types";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  imageUris: z.array(z.custom<ImageUri>()),
});

type PostFormValues = z.infer<typeof schema>;

export default function PostUpdateScreen() {
  const { id } = useLocalSearchParams();

  const { data: post } = useGetPost(Number(id));
  const updatePost = useUpdatePost();
  const { isKeyboardShown, keyboardVerticalOffsetValue } = useKeyboardOffset();

  const onSubmit = (formValues: PostFormValues) => {
    updatePost.mutate({
      id: Number(id),
      body: formValues,
    });
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
      title: post?.title,
      description: post?.description,
      imageUris: post?.imageUris,
    },
  });

  return (
    <FormProvider {...postForm}>
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={keyboardVerticalOffsetValue}
        enabled={isKeyboardShown}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <TitleInput />
          <DescriptionInput />
        </ScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
  },
});
