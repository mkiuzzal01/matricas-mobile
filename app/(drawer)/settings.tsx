import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import AppLayout from "@/components/layouts/AppLayout";
import { Colors } from "@/theme/colors";
import { useAppSelector } from "@/redux/hooks/appHook";

const translations = {
  en: {
    title: "Account Settings",
    sectionGeneral: "General Settings",
    sectionPrivacy: "Privacy & Security",
    darkMode: "Dark Mode",
    pushNotifications: "Push Notifications",
    emailReports: "Email Valuations",
    biometricLogin: "Face ID / Fingerprint",
    offlineCache: "Offline Cache",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    saveSettings: "Save Settings",
  },
  de: {
    title: "Kontoeinstellungen",
    sectionGeneral: "Allgemeine Einstellungen",
    sectionPrivacy: "Datenschutz & Sicherheit",
    darkMode: "Dunkelmodus",
    pushNotifications: "Push-Benachrichtigungen",
    emailReports: "E-Mail-Bewertungen",
    biometricLogin: "Biometrische Anmeldung",
    offlineCache: "Offline-Zwischenspeicher",
    privacyPolicy: "Datenschutzerklärung",
    termsOfService: "Nutzungsbedingungen",
    saveSettings: "Einstellungen speichern",
  },
};

export default function Settings() {
  const lang = useAppSelector((state) => state.root.language.lang);
  const t = translations[lang];

  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [biometrics, setBiometrics] = useState(true);
  const [cache, setCache] = useState(true);

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{t.title}</Text>

        {/* GENERAL SECTION */}
        <Text style={styles.sectionHeader}>{t.sectionGeneral}</Text>
        <View style={styles.sectionBox}>
          <View style={styles.row}>
            <Text style={styles.label}>{t.darkMode}</Text>
            <Switch
              value={true}
              disabled
              trackColor={{ false: "#767577", true: "#5a9e8e" }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t.pushNotifications}</Text>
            <Switch
              value={push}
              onValueChange={setPush}
              trackColor={{ false: "#767577", true: "#5a9e8e" }}
              thumbColor={push ? "#fff" : "#f4f3f4"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t.emailReports}</Text>
            <Switch
              value={email}
              onValueChange={setEmail}
              trackColor={{ false: "#767577", true: "#5a9e8e" }}
              thumbColor={email ? "#fff" : "#f4f3f4"}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t.offlineCache}</Text>
            <Switch
              value={cache}
              onValueChange={setCache}
              trackColor={{ false: "#767577", true: "#5a9e8e" }}
              thumbColor={cache ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* SECURITY SECTION */}
        <Text style={styles.sectionHeader}>{t.sectionPrivacy}</Text>
        <View style={styles.sectionBox}>
          <View style={styles.row}>
            <Text style={styles.label}>{t.biometricLogin}</Text>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: "#767577", true: "#5a9e8e" }}
              thumbColor={biometrics ? "#fff" : "#f4f3f4"}
            />
          </View>
          <TouchableOpacity style={styles.rowClickable}>
            <Text style={styles.labelClickable}>{t.privacyPolicy}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowClickable, { borderBottomWidth: 0 }]}
          >
            <Text style={styles.labelClickable}>{t.termsOfService}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
          <Text style={styles.primaryText}>{t.saveSettings}</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  pageTitle: {
    color: "#5a9e8e",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 11,
    textTransform: "uppercase",
    color: Colors.dark.mutedForeground,
    letterSpacing: 1.5,
    marginBottom: 8,
    marginTop: 10,
  },
  sectionBox: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  rowClickable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  label: {
    fontSize: 13,
    color: Colors.dark.foreground,
    fontWeight: "500",
  },
  labelClickable: {
    fontSize: 13,
    color: Colors.dark.foreground,
    fontWeight: "500",
  },
  arrow: {
    fontSize: 18,
    color: Colors.dark.mutedForeground,
  },
  primaryBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "rgba(90,158,142,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  primaryText: {
    color: "#080d12",
    fontSize: 12,
    fontWeight: "600",
  },
});
