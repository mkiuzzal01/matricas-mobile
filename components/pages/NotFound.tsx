import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/theme/colors';
import { useRouter } from 'expo-router';

export default function NotFound() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>Page Not Found</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(drawer)/home')}
      >
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#5a9e8e',
  },
  subtitle: {
    fontSize: 18,
    color: Colors.dark.foreground,
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.dark.primaryForeground,
    fontWeight: '600',
  },
});
