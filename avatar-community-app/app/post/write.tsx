import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import z from "zod";

import DescriptionInput from "@/components/forms/DescriptionInput";
import TitleInput from "@/components/forms/TitleInput";
import KeyboardAvoidingScrollView from "@/components/hoc/KeyboardAvoidingScrollView";
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

  return (
    <FormProvider {...postForm}>
      <KeyboardAvoidingScrollView>
        <View style={{ padding: 16, gap: 16 }}>
          <TitleInput />
          <DescriptionInput />
        </View>
      </KeyboardAvoidingScrollView>
    </FormProvider>
  );
}
