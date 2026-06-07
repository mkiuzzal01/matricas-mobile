import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/theme/colors";
import { logout } from "@/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/appHook";
import { useGetCurrentUserQuery } from "@/redux/features/auth/auth.api";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const translations = {
  en: {
    profile: "View Profile",
    settings: "Account Settings",
    subscription: "Subscription",
    logout: "Log Out",
  },
  de: {
    profile: "Profil anzeigen",
    settings: "Kontoeinstellungen",
    subscription: "Abonnement",
    logout: "Abmelden",
  },
};

export default function AvatarDropdown() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const avatarRef = useRef<View>(null);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 16 });

  const lang = useAppSelector((state) => state.root.language.lang);
  const reduxUser = useAppSelector((state) => state.root.auth.user);

  const { data, isLoading } = useGetCurrentUserQuery(null);

  // ✅ single source of truth (API overrides redux)
  const user = useMemo(() => {
    return data?.data ?? reduxUser;
  }, [data, reduxUser]);

  const t = translations[lang];

  // ---------- LOGOUT ----------
  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.replace("/");
  }, [dispatch, router]);

  // ---------- TOGGLE ----------
  const toggleDropdown = useCallback(() => {
    if (!avatarRef.current) return;

    if (visible) {
      setVisible(false);
      return;
    }

    avatarRef.current.measure((fx, fy, width, height, px, py) => {
      setPosition({
        top: py + height + 8,
        right: SCREEN_WIDTH - (px + width),
      });
      setVisible(true);
    });
  }, [visible]);

  // ---------- MENU ----------
  const menuItems = useMemo(
    () => [
      {
        label: t.profile,
        action: () => router.push("/(drawer)/profile/user-info"),
      },
      {
        label: t.subscription,
        action: () => router.push("/(drawer)/profile/subscription"),
      },
      {
        label: t.settings,
        action: () => router.push("/(drawer)/profile/settings"),
      },
      {
        label: t.logout,
        action: handleLogout,
        destructive: true,
      },
    ],
    [t, router, handleLogout],
  );

  // ---------- AVATAR URL ----------
  const avatarUrl = useMemo(() => {
    if (user?.avatar) return user.avatar;

    const name = encodeURIComponent(user?.name || "User");

    return `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff`;
  }, [user]);

  return (
    <View ref={avatarRef} collapsable={false}>
      {/* AVATAR */}
      <Pressable onPress={toggleDropdown} style={styles.avatarPressable}>
        <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
      </Pressable>

      {/* MODAL */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, position]}>
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.name}>{user?.name || "Guest User"}</Text>

              <Text style={styles.email}>
                {user?.email || "guest@example.com"}
              </Text>

              {isLoading && <Text style={styles.loading}>Loading...</Text>}
            </View>

            <View style={styles.divider} />

            {/* MENU */}
            {menuItems.map((item, index) => (
              <Pressable
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  setVisible(false);
                  item.action();
                }}
              >
                <Text
                  style={[styles.menuText, item.destructive && styles.danger]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarPressable: {
    borderRadius: 16,
    overflow: "hidden",
  },

  avatarImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#333",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  dropdown: {
    position: "absolute",
    width: 220,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  header: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dark.foreground,
  },

  email: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
    marginTop: 2,
  },

  loading: {
    fontSize: 11,
    marginTop: 4,
    color: "#999",
  },

  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: 6,
  },

  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  menuText: {
    fontSize: 14,
    color: Colors.dark.foreground,
  },

  danger: {
    color: Colors.dark.destructive,
    fontWeight: "600",
  },
});
