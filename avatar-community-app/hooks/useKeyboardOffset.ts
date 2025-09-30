import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useKeyboardOffset() {
  const [isKeyboardShown, setIsKeyboardShown] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const verticalInsets = insets.top + insets.bottom;
  const keyboardVerticalOffsetValue =
    (Keyboard.metrics()?.height || 0) + verticalInsets + 50;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return { isKeyboardShown, keyboardVerticalOffsetValue };
}
