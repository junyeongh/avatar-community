import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";

import { baseUrl } from "@/api/axios";
import { ImageUri } from "@/types";

interface ImagePreviewListProps {
  imageUris: ImageUri[];
}

export default function ImagePreviewList({
  imageUris = [],
}: ImagePreviewListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${baseUrl}/${uri}`;

        return (
          <Pressable
            style={styles.imageContainer}
            key={uri + index}
            onPress={() =>
              router.push({ pathname: "/image", params: { uri: imageUri } })
            }
          >
            <Image style={styles.image} source={{ uri: imageUri }} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // containers
  container: {
    gap: 8,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  // elements
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
