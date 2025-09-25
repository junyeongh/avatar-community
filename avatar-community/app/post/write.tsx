import Button from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import { useCreatePost } from "@/hooks/queries/useCreatePost";
import useKeyboardOffset from "@/hooks/useKeyboardOffset";
import { ImageUri } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import z from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  imageUris: z.array(z.custom<ImageUri>()),
});

type PostFormValues = z.infer<typeof schema>;

export default function PostWriteScreen() {
  const navigation = useNavigation();
  const createPost = useCreatePost();
  const { isKeyboardShown, keyboardVerticalOffsetValue } = useKeyboardOffset();

  const onSubmit = (formValues: PostFormValues) => {
    createPost.mutate(formValues);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label="Save"
          size="medium"
          variant="standard"
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

  return (
    <FormProvider {...postForm}>
      <KeyboardAvoidingView
        behavior="padding"
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
          <DescriptionInput />
          <DescriptionInput />
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
