import React, { useCallback } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

import LanToggle from "../buttons/LanToggle";
import AvatarDropdown from "../dropdown/User";

import { Colors } from "@/theme/colors";
import { useAppSelector } from "@/redux/hooks";

export default function Navbar() {
  const navigation = useNavigation();
  const token = useAppSelector((state) => state.root.auth.token);

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const goToLogin = useCallback(() => {
    router.push("/login");
  }, []);

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <Pressable
          onPress={openDrawer}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <AntDesign name="menu" size={24} color={Colors.dark.foreground} />
        </Pressable>

        <Text style={styles.title}>Métricas</Text>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        <LanToggle />

        {token ? (
          <AvatarDropdown />
        ) : (
          <Pressable
            onPress={goToLogin}
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: Colors.dark.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.dark.foreground,
    letterSpacing: 0.3,
  },

  iconButton: {
    padding: 8,
    borderRadius: 8,
  },

  loginButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 8,
    backgroundColor: Colors.dark.background,
  },

  loginText: {
    color: Colors.dark.foreground,
    fontWeight: "600",
    fontSize: 14,
  },

  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
});
