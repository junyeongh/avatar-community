import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";

import useKeyboardOffset from "@/hooks/useKeyboardOffset";

interface KeyboardAvoidingScrollViewProps {
  children: React.ReactNode;
}

export default function KeyboardAvoidingScrollView({
  children,
}: KeyboardAvoidingScrollViewProps) {
  const { isKeyboardShown, keyboardVerticalOffsetValue } = useKeyboardOffset();

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={keyboardVerticalOffsetValue}
      enabled={isKeyboardShown}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer]}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
