import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

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
    <View>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={[styles.cardValue, accent && { color: '#5a9e8e' }]}>
        {value ?? '-'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardLabel: {
    color: '#7f8ea3',
    fontSize: 11,
  },

  cardValue: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
});
