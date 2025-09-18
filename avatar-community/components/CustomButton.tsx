import { colors } from "@/constants";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface CustomButtonPrps extends PressableProps {
  label: string;
  size?: "large" | "medium";
  variant?: "filled";
}

export default function Button({
  label,
  size = "large",
  variant = "filled",
  ...props
}: CustomButtonPrps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        { backgroundColor: styles[variant].backgroundColor },
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <Text style={[styles.text, { color: styles[variant].color }]}>
        {label}
      </Text>
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
  medium: {},
  // variant
  filled: {
    backgroundColor: colors.ORANGE_600,
    color: colors.WHITE,
  },
  // Pressable props
  pressed: {
    opacity: 0.8,
  },
});
