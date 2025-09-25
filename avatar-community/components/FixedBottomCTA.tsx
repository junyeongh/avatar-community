import Button from "@/components/CustomButton";
import { colors } from "@/constants";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//call-to-action
interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

export default function FixedBottomCTA({
  label,
  onPress,
}: FixedBottomCTAProps) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[styles.fixed, { paddingBottom: Math.max(insets.bottom, 12) }]}
      >
        <Button label={label} onPress={onPress} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fixed: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});
