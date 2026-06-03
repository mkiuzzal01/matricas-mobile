import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AppForm from "../AppForm";
import AppTextInput from "../inputs/TextInput";
import AppFormSubmit from "@/components/buttons/AppFormSubmit";
import { Colors } from "@/theme/colors";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";

const translations = {
  en: {
    title: "Update Password",
    subtitle: "Choose a strong password to secure your account",
    currentPasswordLabel: "Current Password",
    currentPasswordPlaceholder: "••••••••",
    currentPasswordRequired: "Current password is required",
    passwordLabel: "New Password",
    passwordPlaceholder: "••••••••",
    passwordRequired: "New password is required",
    passwordMinLength: "Password must be at least 6 characters",
    confirmPasswordLabel: "Confirm New Password",
    confirmPasswordPlaceholder: "••••••••",
    confirmPasswordRequired: "Please confirm your new password",
    passwordsMismatch: "Passwords do not match",
    submit: "Update Password",
    cancel: "Cancel",
    successMsg: "Password updated successfully!",
    errorMsg: "Failed to update password",
  },
  de: {
    title: "Passwort aktualisieren",
    subtitle: "Wählen Sie ein starkes Passwort, um Ihr Konto zu sichern",
    currentPasswordLabel: "Aktuelles Passwort",
    currentPasswordPlaceholder: "••••••••",
    currentPasswordRequired: "Aktuelles Passwort ist erforderlich",
    passwordLabel: "Neues Passwort",
    passwordPlaceholder: "••••••••",
    passwordRequired: "Neues Passwort ist erforderlich",
    passwordMinLength: "Passwort muss mindestens 6 Zeichen lang sein",
    confirmPasswordLabel: "Neues Passwort bestätigen",
    confirmPasswordPlaceholder: "••••••••",
    confirmPasswordRequired: "Bitte bestätigen Sie Ihr neues Passwort",
    passwordsMismatch: "Passwörter stimmen nicht überein",
    submit: "Passwort aktualisieren",
    cancel: "Abbrechen",
    successMsg: "Passwort erfolgreich aktualisiert!",
    errorMsg: "Passwortaktualisierung fehlgeschlagen",
  },
};

export default function UpdateForm() {
  const lang = useAppSelector((state) => state.language.lang);
  const t = translations[lang];

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(drawer)/settings");
    }
  };

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      console.log("UPDATE PASSWORD SUCCESS:", data);
    } catch (e) {
      Alert.alert(lang === "de" ? "Fehler" : "Error", t.errorMsg);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Logo / Brand Header */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBg}>
              <Ionicons name="trending-up" size={32} color="#ffffff" />
            </View>
            <Text style={styles.logoText}>Métricas</Text>
          </View>

          {/* Titles */}
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>

          {/* Form */}
          <AppForm onSubmit={onSubmit}>
            <AppTextInput
              label={t.currentPasswordLabel}
              name="currentPassword"
              placeholder={t.currentPasswordPlaceholder}
              leftIcon="lock-closed-outline"
              secureTextEntry
              autoCapitalize="none"
              rules={{ required: t.currentPasswordRequired }}
            />

            <AppTextInput
              label={t.passwordLabel}
              name="password"
              placeholder={t.passwordPlaceholder}
              leftIcon="lock-closed-outline"
              secureTextEntry
              autoCapitalize="none"
              rules={{
                required: t.passwordRequired,
                minLength: {
                  value: 6,
                  message: t.passwordMinLength,
                },
              }}
            />

            <AppTextInput
              label={t.confirmPasswordLabel}
              name="confirmPassword"
              placeholder={t.confirmPasswordPlaceholder}
              leftIcon="lock-closed-outline"
              secureTextEntry
              autoCapitalize="none"
              rules={{
                required: t.confirmPasswordRequired,
              }}
            />

            {/* Submit Button */}
            <AppFormSubmit title={t.submit} />
          </AppForm>

          {/* Cancel Link */}
          <View style={styles.footer}>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.linkPressed,
              ]}
            >
              <Text style={styles.cancelText}>{t.cancel}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.dark.foreground,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.dark.foreground,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.mutedForeground,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  submitContainer: {
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: Colors.dark.mutedForeground,
    fontSize: 14,
    fontWeight: "500",
  },
  linkPressed: {
    opacity: 0.7,
  },
});
