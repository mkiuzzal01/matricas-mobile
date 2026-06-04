import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleLanguage } from "@/redux/slices/languageSlice";
import { Colors } from "@/theme/colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LanToggle() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.root.language.lang);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => dispatch(toggleLanguage())}
      >
        <Text style={styles.text}>{lang.toUpperCase()}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 8,
    backgroundColor: Colors.dark.background,
  },

  text: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dark.foreground,
  },
});
