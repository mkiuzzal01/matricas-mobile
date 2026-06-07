import { Stack } from "expo-router";

export default function ValuationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="search" />
      <Stack.Screen name="demo" />
      <Stack.Screen name="result" />
    </Stack>
  );
}
