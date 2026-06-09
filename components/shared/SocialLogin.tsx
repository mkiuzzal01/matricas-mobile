import React, { useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import GoogleIcon from "@/assets/images/icons/Google";
import { useGoogleAuth as useGoogleSignIn } from "@/utils/googleAuth";

interface SocialLoginProps {
  lang?: "en" | "de";
  loading?: boolean;
}

export default function SocialLogin({
  lang = "en",
  loading = false,
}: SocialLoginProps) {
  const { signInWithGoogle, loading: authLoading } = useGoogleSignIn();

  const handleGoogleLogin = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  }, [signInWithGoogle]);

  const isLoading = loading || authLoading;
  const isDisabled = isLoading;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleGoogleLogin}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.button,
          pressed && !isDisabled && styles.pressed,
          isDisabled && styles.disabled,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <GoogleIcon size={20} />
            <Text style={styles.text}>
              {lang === "de" ? "Mit Google anmelden" : "Continue with Google"}
            </Text>
          </>
        )}
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
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    backgroundColor: "#111",
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.6,
  },

  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
