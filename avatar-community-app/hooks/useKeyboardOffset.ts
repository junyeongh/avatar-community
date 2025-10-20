import { useEffect, useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useKeyboardOffset(
  scrollViewRef?: React.RefObject<ScrollView | null>,
) {
  const [isKeyboardShown, setIsKeyboardShown] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const verticalInsets = Math.max(insets.top + insets.bottom, 100);
  const keyboardVerticalOffset =
    (Keyboard.metrics()?.height || 0) + verticalInsets;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShown(true);
      if (scrollViewRef) {
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd();
        }, 50);
      }
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return { isKeyboardShown, verticalInsets, keyboardVerticalOffset };
}
