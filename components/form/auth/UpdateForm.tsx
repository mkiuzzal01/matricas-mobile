import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AppForm from "../AppForm";
import AppTextInput from "../inputs/TextInput";
import AppFormSubmit from "@/components/buttons/AppFormSubmit";

import { Colors } from "@/theme/colors";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks/appHook";

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
  const { height } = useWindowDimensions();
  const lang = useAppSelector((state) => state.root.language.lang);
  const t = translations[lang];

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(drawer)/settings");
  };

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      console.log("UPDATE PASSWORD:", data);
      reset();
    } catch (e) {
      console.log("ERROR:", e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { minHeight: height }, // ✅ FULL SCREEN FIX
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.logoContainer}>
              <View style={styles.logoBg}>
                <Ionicons name="trending-up" size={32} color="#ffffff" />
              </View>

              <Text style={styles.logoText}>Métricas</Text>
            </View>

            {/* TITLES */}
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>

            {/* FORM */}
            <AppForm onSubmit={onSubmit}>
              <AppTextInput
                label={t.currentPasswordLabel}
                name="currentPassword"
                placeholder={t.currentPasswordPlaceholder}
                leftIcon="lock-closed-outline"
                secureTextEntry
                rules={{ required: t.currentPasswordRequired }}
              />

              <AppTextInput
                label={t.passwordLabel}
                name="password"
                placeholder={t.passwordPlaceholder}
                leftIcon="lock-closed-outline"
                secureTextEntry
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
                rules={{
                  required: t.confirmPasswordRequired,
                }}
              />

              <AppFormSubmit title={t.submit} />
            </AppForm>

            {/* FOOTER */}
            <View style={styles.footer}>
              <Pressable
                onPress={handleBack}
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && { opacity: 0.6 },
                ]}
              >
                <Text style={styles.cancelText}>{t.cancel}</Text>
              </Pressable>
            </View>
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

  scroll: {
    flexGrow: 1,
  },

  wrapper: {
    flex: 1,
    justifyContent: "center", // ✅ safe centering
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.dark.border,

    // optional soft elevation (safe cross-platform)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
  },

  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.dark.foreground,
    marginTop: 10,
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
});
