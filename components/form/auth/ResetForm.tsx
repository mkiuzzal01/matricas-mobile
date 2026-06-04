import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FieldValues } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppFormSubmit from "@/components/buttons/AppFormSubmit";
import { useAppSelector } from "@/redux/hooks";
import { Colors } from "@/theme/colors";
import AppForm from "../AppForm";
import AppTextInput from "../inputs/TextInput";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "@/utils/toast";

const translations = {
  en: {
    title: "Reset Password",
    subtitle:
      "Enter the 6-digit code sent to your email and choose a new password",

    codeLabel: "Verification Code",
    codePlaceholder: "123456",
    codeRequired: "Verification code is required",
    codeLength: "Code must be exactly 6 digits",

    passwordLabel: "New Password",
    passwordPlaceholder: "••••••••",
    passwordRequired: "New password is required",
    passwordMinLength: "Password must be at least 6 characters",

    confirmPasswordLabel: "Confirm New Password",
    confirmPasswordPlaceholder: "••••••••",
    confirmPasswordRequired: "Please confirm your password",
    passwordsMismatch: "Passwords do not match",

    submit: "Reset Password",
    backToLogin: "Back to Login",

    successMsg:
      "Password reset successful! Please login with your new password.",
    errorMsg: "Resetting password failed",
  },
  de: {
    title: "Passwort zurücksetzen",
    subtitle:
      "Geben Sie den 6-stelligen Code ein und wählen Sie ein neues Passwort",

    codeLabel: "Bestätigungscode",
    codePlaceholder: "123456",
    codeRequired: "Bestätigungscode ist erforderlich",
    codeLength: "Der Code muss genau 6 Stellen haben",

    passwordLabel: "Neues Passwort",
    passwordPlaceholder: "••••••••",
    passwordRequired: "Neues Passwort ist erforderlich",
    passwordMinLength: "Passwort muss mindestens 6 Zeichen lang sein",

    confirmPasswordLabel: "Neues Passwort bestätigen",
    confirmPasswordPlaceholder: "••••••••",
    confirmPasswordRequired: "Bitte bestätigen Sie Ihr Passwort",
    passwordsMismatch: "Passwörter stimmen nicht überein",

    submit: "Passwort zurücksetzen",
    backToLogin: "Zurück zum Login",

    successMsg:
      "Passwort erfolgreich zurückgesetzt! Bitte loggen Sie sich ein.",
    errorMsg: "Zurücksetzen des Passworts fehlgeschlagen",
  },
};
interface Props {
  email: string;
  otp: string;
}
export default function ResetForm({ email, otp }: Props) {
  const lang = useAppSelector((state) => state.root.language.lang);
  const t = translations[lang];
  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      const res = await resetPassword({ ...data, email, otp }).unwrap();
      if (res.message) {
        toast.success(res.message);
        reset();
        router.replace("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBg}>
              <Ionicons name="trending-up" size={32} color="#fff" />
            </View>
            <Text style={styles.logoText}>Métricas</Text>
          </View>

          {/* TITLE */}
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>

          {/* FORM */}
          <AppForm onSubmit={onSubmit}>
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
              name="password_confirmation"
              placeholder={t.confirmPasswordPlaceholder}
              leftIcon="lock-closed-outline"
              secureTextEntry
              rules={{
                required: t.confirmPasswordRequired,
              }}
            />

            <AppFormSubmit title={t.submit} />
          </AppForm>

          {/* BACK */}
          <View style={styles.footer}>
            <Pressable
              onPress={() => router.push("/login")}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.linkPressed,
              ]}
            >
              <Ionicons name="arrow-back-outline" size={16} color="#6366f1" />
              <Text style={styles.backText}>{t.backToLogin}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/** ---------------- STYLES ---------------- */
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
    maxWidth: 420,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.dark.border,
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
  submitContainer: {
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  backText: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "600",
  },
  linkPressed: {
    opacity: 0.7,
  },
});
