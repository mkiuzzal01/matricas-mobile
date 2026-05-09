import { Drawer } from 'expo-router/drawer';
import { navigation } from '@/components/layouts/navigationLinks';
import { StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{ headerShown: false, drawerStyle: styles.container }}
    >
      {navigation.map((item) => (
        <Drawer.Screen
          key={item.route}
          name={item.route}
          options={{
            title: item.title,
            drawerActiveBackgroundColor: Colors.dark.primary,
            drawerActiveTintColor: Colors.dark.primaryForeground,
            drawerInactiveTintColor: Colors.dark.foreground,
            drawerInactiveBackgroundColor: Colors.dark.background,
          }}
        />
      ))}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
