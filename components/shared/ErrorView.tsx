import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  message?: string;
};

export default function ErrorView({ message = "Something went wrong" }: Props) {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "#ff4d4f",
    fontSize: 14,
    textAlign: "center",
  },
});
