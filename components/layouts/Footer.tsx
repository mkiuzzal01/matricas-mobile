import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { footerLinks } from './footerLinks';
import { Colors } from '@/theme/colors';

export default function Footer() {
  return (
    <View style={styles.container}>
      {footerLinks.map((item) => (
        <Pressable
          key={item.key}
          onPress={() => router.push(item.href as any)}
          style={styles.link}
        >
          <Text style={styles.text}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
  },

  link: {
    marginHorizontal: 10,
    marginVertical: 6,
  },

  text: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.dark.foreground,
  },
});
