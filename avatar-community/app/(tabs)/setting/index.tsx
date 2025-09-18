import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function SettingScreen() {

  return (
    <SafeAreaProvider>
      <SafeAreaView>
          <Text>My setting screen</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
