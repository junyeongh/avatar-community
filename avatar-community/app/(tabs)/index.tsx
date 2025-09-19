// import Button from "@/components/CustomButton";
import FeedItem from "@/components/FeedItem";
// import { router } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home screen</Text>
      {/* <Button
        label="Button"
        onPress={() => {
          router.push("/auth");
        }}
      /> */}
      <FeedItem
        post={{
          id: 1,
          userId: 1,
          title: "test title",
          description:
            "Cupidatat fugiat ea laboris incididunt eiusmod ullamco et Lorem occaecat est. Enim laborum cillum amet ea elit sunt ullamco ea non laboris. Fugiat voluptate anim laborum cupidatat quis. Sunt sunt esse anim cupidatat fugiat. Sit exercitation laboris irure aliquip consectetur eu sit. Ad consectetur elit irure commodo commodo dolor do incididunt commodo sint enim nisi labore reprehenderit. Occaecat commodo cupidatat aliqua esse adipisicing adipisicing aute adipisicing culpa velit non exercitation cupidatat laboris.",
          createdAt: "test createdAt",
          author: {
            id: 1,
            nickname: "this",
            imageUri: "",
          },
          imageUris: [],
          likes: [],
          hasVote: false,
          voteCount: 1,
          commentCount: 1,
          viewCount: 1,
        }}
      />
    </SafeAreaView>
  );
}
