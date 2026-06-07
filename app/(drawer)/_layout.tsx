import { navigation } from "@/components/layouts/navigationLinks";
import { Colors } from "@/theme/colors";
import { Drawer } from "expo-router/drawer";

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

      <Drawer.Screen
        name="valuation"
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
    </Drawer>
  );
}
