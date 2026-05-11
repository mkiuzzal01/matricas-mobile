import AppLayout from '@/components/layouts/AppLayout';
import { Colors } from '@/theme/colors';
import React from 'react';
import { Text } from 'react-native';

export default function Pricing() {
  return (
    <AppLayout>
      <Text style={{ color: Colors.dark.foreground }}>Pricing</Text>
    </AppLayout>
  );
}
