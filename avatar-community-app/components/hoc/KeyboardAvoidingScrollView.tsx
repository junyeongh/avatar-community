import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import useKeyboardOffset from "@/hooks/useKeyboardOffset";

interface KeyboardAvoidingScrollViewProps {
  children: React.ReactNode;
  scrollViewRef?: React.RefObject<ScrollView | null>;
}

export default function KeyboardAvoidingScrollView({
  children,
  scrollViewRef,
}: KeyboardAvoidingScrollViewProps) {
  const { isKeyboardShown, keyboardVerticalOffsetValue } =
    useKeyboardOffset(scrollViewRef);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={keyboardVerticalOffsetValue}
      enabled={isKeyboardShown}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flexGrow: 1 }}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
