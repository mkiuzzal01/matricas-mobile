import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Navbar from './Navbar';
import Footer from './Footer';
import { Colors } from '@/theme/colors';

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  const theme = Colors.dark;
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Navbar />
      <View style={styles.content}>{children}</View>
      <Footer />
    </SafeAreaView>
  );
}

const createStyles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    content: {
      flex: 1,
      padding: 10,
    },
  });
