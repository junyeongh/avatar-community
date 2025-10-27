import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchFeedList from "@/components/search/SearchFeedList";

interface SearchScreenProps {}

export default function SearchScreen({}: SearchScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <SearchFeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
