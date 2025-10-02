import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";

import DescriptionInput from "@/components/forms/DescriptionInput";
import TitleInput from "@/components/forms/TitleInput";
import KeyboardAvoidingScrollView from "@/components/hoc/KeyboardAvoidingScrollView";
import Button from "@/components/ui/Button";
import { colors } from "@/constants";
import { useUploadImages } from "@/hooks/queries/useImages";
import { useCreatePost } from "@/hooks/queries/usePost";
import { ImageUri } from "@/types";
import { getFormDataImages } from "@/utils/image";

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
          </ScrollView>
        </KeyboardAvoidingScrollView>
        <PostWriteFooter />
      </SafeAreaView>
    </FormProvider>
  );
}

function PostWriteFooter() {
  const uploadImages = useUploadImages();

  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // images by default
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    // console.log("result: ", result.assets);
    const formData = getFormDataImages("images", result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => console.log("data: ", data),
    });
  };

  return (
    <View style={styles.footerContainer}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name='camera' size={20} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    borderRadius: 5,
  },
});
