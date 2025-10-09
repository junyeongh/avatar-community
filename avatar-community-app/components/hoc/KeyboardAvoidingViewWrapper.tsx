import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

import useKeyboardOffset from "@/hooks/useKeyboardOffset";

interface KeyboardAvoidingViewWrapperProps {
  children: React.ReactNode;
  scrollViewRef?: React.RefObject<ScrollView | null>;
  styles?: StyleProp<ViewStyle>;
  isModal?: boolean;
}

export default function KeyboardAvoidingViewWrapper({
  children,
  scrollViewRef,
  styles,
  isModal = false,
}: KeyboardAvoidingViewWrapperProps) {
  const { isKeyboardShown, verticalInsets, keyboardVerticalOffset } =
    useKeyboardOffset(scrollViewRef);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={isModal ? verticalInsets : keyboardVerticalOffset}
      enabled={isKeyboardShown}
      style={[{ flex: 1 }, styles]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flexGrow: 1 }}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
