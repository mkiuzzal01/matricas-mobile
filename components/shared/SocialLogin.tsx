import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import GoogleIcon from "@/assets/images/icons/Google";

interface SocialLoginProps {
  lang?: "en" | "de";
  loading?: boolean;
}

export default function SocialLogin({
  lang = "en",
  loading = false,
}: SocialLoginProps) {
  const handleGoogleLogin = async () => {};

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleGoogleLogin}
        disabled={loading}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
          loading && styles.disabled,
        ]}
      >
        <GoogleIcon size={20} />

        <Text style={styles.text}>
          {loading ? (lang === "de" ? "Laden..." : "Loading...") : "Google"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 10,
    backgroundColor: "#111",
  },

  pressed: {
    opacity: 0.7,
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});
