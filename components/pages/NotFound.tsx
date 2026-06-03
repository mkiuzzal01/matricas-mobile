import React, { useCallback } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { Colors } from "@/theme/colors";

export default function NotFound() {
  const router = useRouter();

  const goHome = useCallback(() => {
    router.replace("/home");
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>404</Text>

        <Text style={styles.subtitle}>Page Not Found</Text>

        <Text style={styles.description}>
          The page you are looking for doesn’t exist or has been moved.
        </Text>

        <Pressable
          onPress={goHome}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Go Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  content: {
    alignItems: "center",
    maxWidth: 400,
  },

  title: {
    fontSize: 84,
    fontWeight: "800",
    color: Colors.dark.primary,
    letterSpacing: 2,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.dark.foreground,
    marginTop: 8,
  },

  description: {
    fontSize: 14,
    color: Colors.dark.mutedForeground,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 28,
    lineHeight: 20,
  },

  button: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  buttonText: {
    color: Colors.dark.primaryForeground,
    fontWeight: "600",
    fontSize: 14,
  },
});
