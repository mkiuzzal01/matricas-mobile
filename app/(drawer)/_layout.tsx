import { Drawer } from 'expo-router/drawer';
import { navigation } from '@/components/layouts/navigationLinks';
import { Colors } from '@/theme/colors';

export default function DrawerLayout() {
  const theme = Colors.dark;

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      {navigation.map((item) => (
        <Drawer.Screen
          key={item.route}
          name={item.route}
          options={{
            title: item.title,
            drawerActiveBackgroundColor: theme.primary,
            drawerActiveTintColor: theme.primaryForeground,
            drawerInactiveTintColor: theme.foreground,
            drawerInactiveBackgroundColor: theme.background,
          }}
        />
      ))}
    </Drawer>
  );
}
