import React from 'react';
import { Stack } from 'expo-router';
import StoreProvider from '@/components/providers/StoreProvider';

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
