import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFormContext, useWatch } from "react-hook-form";
import { Alert, Pressable, StyleSheet, View } from "react-native";

import { colors } from "@/constants";
import { useUploadImages } from "@/hooks/queries/useImages";
import { getFormDataImages } from "@/utils/image";

export function PostWriteFooter() {
  const uploadImages = useUploadImages();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ["imageUris"] });

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert(
        "Image Limit Exceeded",
        "You can only add up to 5 images.\nPlease select your images.",
      );
      return;
    }

    setValue("imageUris", [...imageUris, ...uris.map((uri) => ({ uri: uri }))]);
  };

  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // images by default
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    const formData = getFormDataImages("images", result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => addImageUris(data),
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
