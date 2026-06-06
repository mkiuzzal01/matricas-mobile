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
        name="valuation/search"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="valuation/demo"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="valuation/result"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="profile/update-pass"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="profile/edit-profile"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="profile/subscription"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="profile/user-info"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="profile/settings"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="profile/notifications"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="profile/delete-account"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
