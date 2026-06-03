import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotFoundComponent from '@/components/pages/NotFound';

export default function NotFoundScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <NotFoundComponent />
    </SafeAreaView>
  );
}
