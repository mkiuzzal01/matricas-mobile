import React from "react";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="update-pass" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="user-info" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="delete-account" />
    </Stack>
  );
}
