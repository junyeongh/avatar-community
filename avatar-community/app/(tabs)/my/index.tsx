import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function MyScreen() {

  return (
    <SafeAreaProvider>
      <SafeAreaView>
          <Text>My information screen</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
