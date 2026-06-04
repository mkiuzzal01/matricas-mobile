import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

interface SocialLoginProps {
  lang?: string;
}

export default function SocialLogin({ lang = "en" }: SocialLoginProps) {
  const handleSocialLogin = (platform: string) => {
    Alert.alert(
      "Social Login",
      lang === "de"
        ? `Anmeldung mit ${platform} wird in Kürze verfügbar sein.`
        : `${platform} login will be available soon.`,
    );
  };

  return (
    <View>
      <View style={styles.socialContainer}>
        <Pressable
          onPress={() => handleSocialLogin("Google")}
          style={({ pressed }) => [
            styles.socialButton,
            pressed && styles.socialButtonPressed,
          ]}
        >
          <Ionicons name="logo-google" size={20} color="#EA4335" />
          <Text style={styles.socialButtonText}>
            {lang === "de" ? "Google" : "Google"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialContainer: {
    marginTop: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  socialButtonPressed: {
    opacity: 0.7,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
});
