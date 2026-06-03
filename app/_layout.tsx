import StoreProvider from '@/components/providers/StoreProvider';
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(drawer)" />
      </Stack>
    </StoreProvider>
  );
}
