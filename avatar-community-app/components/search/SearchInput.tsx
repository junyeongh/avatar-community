import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { colors } from "@/constants";

interface SearchInputProps extends TextInputProps {
  handleSubmitEditing?: () => void;
}

export default function SearchInput({
  handleSubmitEditing,
  ...props
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={colors.GRAY_500}
        autoCapitalize='none'
        returnKeyType='search'
        onSubmitEditing={handleSubmitEditing}
        {...props}
      />
      <Ionicons
        name='search'
        size={20}
        onPress={props.onPress ?? handleSubmitEditing}
        color={colors.GRAY_500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 44,
    backgroundColor: colors.GRAY_100,
    borderRadius: 100,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingLeft: 8,
    color: colors.BLACK,
    fontFamily: "Inter_600SemiBold",
  },
});
