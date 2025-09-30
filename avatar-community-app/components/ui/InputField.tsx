import { colors } from "@/constants";
import { Ref } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "standard" | "outlined";
  error?: string;
  rightChild?: React.ReactNode;
  ref?: Ref<TextInput>;
}

export default function InputField({
  label,
  variant = "filled",
  error = "",
  rightChild = null,
  ref,
  ...props
}: InputFieldProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          styles[variant],
          Boolean(error) && styles.inputError,
          props.multiline && {
            alignItems: "flex-start",
            paddingVertical: 10,
            height: 200,
          },
        ]}
      >
        <TextInput
          ref={ref}
          placeholderTextColor={colors.GRAY_500}
          style={styles.input}
          autoCapitalize='none'
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
        {rightChild}
      </View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 12, color: colors.GRAY_700, marginBottom: 5 },
  container: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  // variant
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  standard: {},
  outlined: {},
  //
  inputError: {
    backgroundColor: colors.RED_100,
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    color: colors.RED_500,
  },
});
