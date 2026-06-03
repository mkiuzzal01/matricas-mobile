import React, { useRef, useState, useMemo } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "@/theme/colors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";

import { useRouter } from 'expo-router';

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
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownRight, setDropdownRight] = useState(16);
  const avatarRef = useRef<View>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const lang = useAppSelector((state) => state.language.lang);
  const { user } = useAppSelector((state) => state.auth);
  const t = translations[lang];

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/(drawer)/home');
  };

  const toggleDropdown = () => {
    if (!visible && avatarRef.current) {
      avatarRef.current.measure((fx, fy, width, height, px, py) => {
        setDropdownTop(py + height + 8); // Places menu exactly 8px below the avatar
        setDropdownRight(SCREEN_WIDTH - (px + width)); // Aligns right border
        setVisible(true);
      });
    } else {
      setVisible(false);
    }
  };

  const menuItems = useMemo(
    () => [
      { label: t.profile, action: () => router.push('/(drawer)/Profile') },
      {
        label: t.subscription,
        action: () => router.push('/(drawer)/subscription'),
      },
      { label: t.settings, action: () => router.push('/(drawer)/settings') },
      {
        label: t.logout,
        action: handleLogout,
        isDestructive: true,
      },
    ],
    [t, router],
  );

  return (
    <View ref={avatarRef} collapsable={false}>
      <Pressable onPress={toggleDropdown} style={styles.avatarPressable}>
        <Image
          source={{
            uri: user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
          }}
          style={styles.avatarImage}
        />
      </Pressable>

      {/* Dropdown Menu Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.dropdownMenu,
              { top: dropdownTop, right: dropdownRight },
            ]}
          >
            <View style={styles.userInfoHeader}>
              <Text style={styles.userName}>{user?.name || "Guest User"}</Text>
              <Text style={styles.userEmail}>{user?.email || "guest@example.com"}</Text>
            </View>
            <View style={styles.divider} />

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
                  style={[
                    styles.menuItemText,
                    item.isDestructive && styles.destructiveText,
                  ]}
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  dropdownMenu: {
    position: "absolute",
    width: 200,
    backgroundColor: Colors.dark.card,
    borderRadius: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  userInfoHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dark.foreground,
  },
  userEmail: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: 6,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 14,
    color: Colors.dark.foreground,
  },
  destructiveText: {
    color: Colors.dark.destructive,
    fontWeight: "500",
  },
});
