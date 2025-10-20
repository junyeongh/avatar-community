import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import { colors } from "@/constants";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "large" | "medium";
  variant?: "standard" | "filled" | "outlined";
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  label,
  size = "large",
  variant = "filled",
  style = null,
  ...props
}: CustomButtonProps) {
  const { color: variantText, ...variantPressable } = styles[variant];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        // { backgroundColor: styles[variant].backgroundColor },
        variantPressable,
        props.disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: variantText }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  // size
  large: {
    width: "100%",
    height: 44,
  },
  medium: {
    height: 36,
    alignSelf: "center",
    paddingHorizontal: 12,
  },
  // variant
  standard: {
    backgroundColor: undefined,
    color: colors.ORANGE_600,
  },
  filled: {
    backgroundColor: colors.ORANGE_600,
    color: colors.WHITE,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
    backgroundColor: colors.WHITE,
    color: colors.ORANGE_600,
  },
  // Pressable props
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: colors.GRAY_300,
  },
});
