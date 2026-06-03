import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import LanToggle from '../buttons/LanToggle';
import AvatarDropdown from '../dropdown/User';
import { Colors } from '@/theme/colors';

export default function Navbar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Pressable
          style={styles.menuButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <AntDesign name="menu" size={24} color={Colors.dark.foreground} />
        </Pressable>

        <Text style={styles.menuText}>Metricas</Text>
      </View>

      <View style={styles.rightSection}>
        <LanToggle />
        <AvatarDropdown />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    backgroundColor: Colors.dark.background,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  menuButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
  },

  profileButton: {
    padding: 8,
  },

  menuText: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.dark.foreground,
  },
});
