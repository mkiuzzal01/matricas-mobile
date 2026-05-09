import { Colors } from '@/theme/colors';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LanToggle() {
  const [lan, setLan] = React.useState<'EN' | 'DE'>('EN');

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => setLan(lan === 'EN' ? 'DE' : 'EN')}
      >
        <Text style={styles.text}>{lan}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 8,
    backgroundColor: Colors.dark.background,
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.foreground,
  },
});
