import Button from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import { useCreatePost } from "@/hooks/queries/useCreatePost";
import { ImageUri } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import z from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  imageUris: z.array(z.custom<ImageUri>()),
});

// interface PostFormValues {
//   title: string;
//   description: string;
//   imageUris: ImageUri;
// }

type PostFormValues = z.infer<typeof schema>;

export default function PostWriteScreen() {
  const navigation = useNavigation();
  const createPost = useCreatePost();

  const onSubmit = (formValues: PostFormValues) => {
    createPost.mutate(formValues);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button label="Save" size="medium" variant="standard" onPress={postForm.handleSubmit(onSubmit)} />
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
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FormProvider {...postForm}>
          <TitleInput />
          <DescriptionInput />
          {/* <DescriptionInput />
          <DescriptionInput />
          <DescriptionInput /> */}
        </FormProvider>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
