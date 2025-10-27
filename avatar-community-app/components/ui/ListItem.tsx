import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "@/constants";

interface ListItemProps extends PressableProps {
  title: string;
  icon?: React.ReactNode;
}

export default function ListItem({
  title,
  icon = null,
  ...props
}: ListItemProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
    >
      {icon}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY_200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: colors.GRAY_200,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.BLACK,
    // Android only
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
