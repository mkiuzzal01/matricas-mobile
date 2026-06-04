import StoreProvider from "@/components/providers/StoreProvider";
import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot" />
        <Stack.Screen name="reset" />
        <Stack.Screen name="update-password" />
      </Stack>
      <Toast position="top" visibilityTime={3000} autoHide />
    </StoreProvider>
  );
}
