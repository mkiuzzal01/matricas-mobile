import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/theme/colors';

export default function Card({
  label,
  value,
  accent,
}: {
  label: string;
  value: any;
  accent?: boolean;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={[styles.cardValue, accent && { color: '#5a9e8e' }]}>
        {value ?? '-'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    padding: 12,
    flexBasis: '47%',
    flexGrow: 1,
  },

  cardLabel: {
    color: '#7f8ea3',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  cardValue: {
    color: '#fff',
    fontSize: 16,
    marginTop: 6,
    fontWeight: 'bold',
  },
});
