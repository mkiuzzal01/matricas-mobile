import { Drawer } from "expo-router/drawer";
import { navigation } from "@/components/layouts/navigationLinks";
import { Colors } from "@/theme/colors";

export default function DrawerLayout() {
  const theme = Colors.light;

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      {/* Sidebar items */}
      {navigation.map((item) => (
        <Drawer.Screen
          key={item.route}
          name={item.route}
          options={{
            title: item.title,
            drawerActiveBackgroundColor: theme.background,
            drawerActiveTintColor: theme.primary,
            drawerInactiveTintColor: theme.foreground,
            drawerInactiveBackgroundColor: theme.background,
          }}
        />
      ))}

      {/* Hidden screens that still have drawer access */}
      <Drawer.Screen
        name="search"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="analysis"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="result"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="subscription"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
