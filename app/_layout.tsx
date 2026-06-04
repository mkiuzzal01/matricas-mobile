import StoreProvider from "@/components/providers/StoreProvider";
import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import { Platform, StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <StoreProvider>
      <StatusBar barStyle="light-content" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot" />
        <Stack.Screen name="reset" />
        <Stack.Screen name="update-password" />
      </Stack>

      <Toast
        position="bottom"
        bottomOffset={Platform.OS === "ios" ? 60 : 30}
        visibilityTime={3000}
        autoHide
      />
    </StoreProvider>
  );
}
