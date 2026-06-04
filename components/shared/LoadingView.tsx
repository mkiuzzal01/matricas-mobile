import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Colors } from "@/theme/colors";

export default function LoadingView() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={Colors.dark.foreground} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
