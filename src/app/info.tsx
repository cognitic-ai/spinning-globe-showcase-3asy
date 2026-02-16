import { ScrollView, Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";

export default function InfoRoute() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <View
        style={{
          backgroundColor: AC.secondarySystemGroupedBackground as any,
          borderRadius: 16,
          borderCurve: "continuous",
          padding: 20,
          gap: 12,
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: "700", color: AC.label as any }}
        >
          About Globe Viewer
        </Text>
        <Text
          selectable
          style={{
            fontSize: 15,
            lineHeight: 22,
            color: AC.secondaryLabel as any,
          }}
        >
          This app renders a WebGL globe using the cobe library inside an Expo
          DOM component. The globe spins continuously and displays markers for
          major cities around the world.
        </Text>
        <Text
          selectable
          style={{
            fontSize: 15,
            lineHeight: 22,
            color: AC.secondaryLabel as any,
          }}
        >
          Built with Expo Router, @bacons/apple-colors for adaptive theming,
          and native iOS toolbar buttons.
        </Text>
      </View>
    </ScrollView>
  );
}
