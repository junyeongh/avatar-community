import Button from "@/components/CustomButton";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home screen</Text>
      <Button label="Button" />
    </SafeAreaView>
  );
}
