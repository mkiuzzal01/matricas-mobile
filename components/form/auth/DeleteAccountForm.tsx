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
  useWindowDimensions,
} from "react-native";

import AppFormSubmit from "@/components/buttons/AppFormSubmit";
import AppForm from "../AppForm";
import AppTextInput from "../inputs/TextInput";

import { useDeleteAccountMutation } from "@/redux/features/auth/auth.api";
import { logout } from "@/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/appHook";
import { Colors } from "@/theme/colors";
import { toast } from "@/utils/toast";

export default function DeleteAccountForm() {
  const dispatch = useAppDispatch();
  const { height } = useWindowDimensions();
  const lang = useAppSelector((state) => state.root.language.lang);

  const t = {
    en: {
      title: "Delete Account",
      subtitle: "Enter your password to permanently delete your account",
      passwordLabel: "Password",
      passwordRequired: "Password is required",
      confirm: "Delete Account",
      back: "Cancel",
      success: "Account deleted successfully",
      error: "Failed to delete account",
    },
    de: {
      title: "Konto löschen",
      subtitle: "Passwort eingeben um Konto zu löschen",
      passwordLabel: "Passwort",
      passwordRequired: "Passwort ist erforderlich",
      confirm: "Konto löschen",
      back: "Abbrechen",
      success: "Konto gelöscht",
      error: "Fehler beim Löschen",
    },
  }[lang];

  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      const res = await deleteAccount({
        password: data.password,
      }).unwrap();
      toast.success(res?.message ?? t.success);
      reset();
      dispatch(logout());
      router.replace("/home");
    } catch (err: any) {
      toast.error(err?.data?.message ?? t.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { minHeight: height }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.wrapper}>
          <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.header}>
              <View style={styles.icon}>
                <Ionicons name="trash" size={28} color="#fff" />
              </View>

              <Text style={styles.title}>{t.title}</Text>
              <Text style={styles.subtitle}>{t.subtitle}</Text>
            </View>

            {/* FORM */}
            <AppForm onSubmit={onSubmit}>
              <AppTextInput
                name="password"
                label={t.passwordLabel}
                placeholder="••••••••"
                secureTextEntry
                rules={{
                  required: t.passwordRequired,
                }}
              />

              <AppFormSubmit title={t.confirm} isLoading={isLoading} />
            </AppForm>

            {/* BACK */}
            <Pressable onPress={() => router.back()} style={styles.back}>
              <Ionicons name="arrow-back" size={16} color="#6366f1" />
              <Text style={styles.backText}>{t.back}</Text>
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

  scroll: {
    flexGrow: 1,
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    maxWidth: 420,
    width: "100%",
    alignSelf: "center",
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  icon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.dark.foreground,
  },

  subtitle: {
    fontSize: 13,
    color: Colors.dark.mutedForeground,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },

  back: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 6,
  },

  backText: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "600",
  },
});
