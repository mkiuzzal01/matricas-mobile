import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";

import { Colors } from "@/theme/colors";

export default function NotFound() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const goHome = useCallback(() => {
    router.replace("/");
  }, [router]);

  const isSmallScreen = width < 400;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          {
            maxWidth: 500,
            width: "100%",
          },
        ]}
      >
        <Text style={[styles.title, { fontSize: isSmallScreen ? 64 : 96 }]}>
          404
        </Text>

        <Text style={[styles.subtitle, { fontSize: isSmallScreen ? 18 : 24 }]}>
          Page Not Found
        </Text>

        <Text
          style={[styles.description, { fontSize: isSmallScreen ? 14 : 16 }]}
        >
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
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  content: {
    alignItems: "center",
  },

  title: {
    fontWeight: "800",
    color: Colors.dark.primary,
    textAlign: "center",
  },

  subtitle: {
    fontWeight: "600",
    color: Colors.dark.foreground,
    marginTop: 8,
    textAlign: "center",
  },

  description: {
    color: Colors.dark.mutedForeground,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: 420,
  },

  button: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    minWidth: 140,
    alignItems: "center",
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  buttonText: {
    color: Colors.dark.primaryForeground,
    fontWeight: "600",
    fontSize: 16,
  },
});
