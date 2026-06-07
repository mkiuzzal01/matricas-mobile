import React, { useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AppLayout from "@/components/layouts/AppLayout";
import { Colors } from "@/theme/colors";
import { useAppSelector } from "@/redux/hooks/appHook";
import { router } from "expo-router";

const translations = {
  en: {
    title: "Account Settings",
    sectionGeneral: "General Settings",
    sectionPrivacy: "Privacy & Security",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    deleteAccount: "Delete Account",
    deleteDesc: "You can delete your account and all of your data",
    notifications: "Notifications",
  },
  de: {
    title: "Kontoeinstellungen",
    sectionGeneral: "Allgemeine Einstellungen",
    sectionPrivacy: "Datenschutz & Sicherheit",
    privacyPolicy: "Datenschutzerklärung",
    termsOfService: "Nutzungsbedingungen",
    deleteAccount: "Konto löschen",
    deleteDesc: "Sie können Ihr Konto und alle Daten löschen",
    notifications: "Benachrichtigungen",
  },
};

export default function Settings() {
  const lang = useAppSelector((state) => state.root.language.lang);
  const t = useMemo(() => translations[lang], [lang]);

  const [settings, setSettings] = useState({
    push: true,
    email: false,
    biometrics: true,
  });

  const toggle = useCallback((key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.title}>{t.title}</Text>

        {/* GENERAL */}
        <Text style={styles.section}>{t.sectionGeneral}</Text>

        <View style={styles.card}>
          {/* Notifications */}
          <View style={styles.row}>
            <Text style={styles.text}>{t.notifications}</Text>
            <Pressable onPress={() => router.push("/profile/notifications")}>
              <Text style={styles.link}>Open</Text>
            </Pressable>
          </View>
        </View>

        {/* SECURITY */}
        <Text style={styles.section}>{t.sectionPrivacy}</Text>

        <View style={styles.card}>
          <Pressable style={styles.row} onPress={() => router.push("/privacy")}>
            <Text style={styles.text}>{t.privacyPolicy}</Text>
          </Pressable>

          <Pressable style={styles.row} onPress={() => router.push("/terms")}>
            <Text style={styles.text}>{t.termsOfService}</Text>
          </Pressable>
        </View>

        {/* DELETE */}
        <View style={styles.deleteBox}>
          <Text style={styles.deleteDesc}>{t.deleteDesc}</Text>

          <Pressable onPress={() => router.push("/profile/delete-account")}>
            <Text style={styles.deleteText}>{t.deleteAccount}</Text>
          </Pressable>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  title: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "#5a9e8e",
    letterSpacing: 3,
    marginBottom: 16,
  },

  section: {
    fontSize: 11,
    color: Colors.dark.mutedForeground,
    marginTop: 14,
    marginBottom: 8,
    textTransform: "uppercase",
  },

  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    padding: 12,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  text: {
    fontSize: 13,
    color: Colors.dark.foreground,
  },

  link: {
    fontSize: 13,
    color: "#5a9e8e",
    fontWeight: "600",
  },

  deleteBox: {
    marginVertical: 10,
    padding: 10,
  },

  deleteDesc: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
    marginBottom: 6,
  },

  deleteText: {
    color: "#ff4d4d",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#5a9e8e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#081014",
    fontWeight: "600",
    fontSize: 12,
  },
});
