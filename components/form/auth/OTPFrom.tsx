import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { Colors } from "@/theme/colors";

import AppForm from "../AppForm";
import AppFormSubmit from "@/components/buttons/AppFormSubmit";
import OTPInput from "../inputs/OTPInput";

/** ---------------- TYPES ---------------- */
type OTPFormData = {
  code: string;
};

/** ---------------- TRANSLATIONS ---------------- */
const translations = {
  en: {
    title: "Verify OTP",
    subtitle: "Enter the 6-digit code sent to your email",
    submit: "Verify",
    successMsg: "OTP verified successfully!",
    errorMsg: "Invalid OTP",
  },
  de: {
    title: "OTP bestätigen",
    subtitle: "Geben Sie den 6-stelligen Code ein",
    submit: "Bestätigen",
    successMsg: "OTP erfolgreich bestätigt!",
    errorMsg: "Ungültiger OTP",
  },
};

/** ---------------- MAIN ---------------- */
export default function OTPForm() {
  const lang = useAppSelector((state) => state.language.lang);
  const t = lang === "de" ? translations.de : translations.en;

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      console.log("OTP VERIFY:", data);

      // await verifyOTP(data.code)

      reset();
    } catch (e) {
      console.log("OTP ERROR:", e);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* HEADER */}
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>

          {/* FORM */}
          <AppForm defaultValues={{ code: "" }} onSubmit={onSubmit}>
            <OTPInput
              name="code"
              rules={{
                required: true,
                pattern: {
                  value: /^\d{6}$/,
                  message: "OTP must be 6 digits",
                },
              }}
            />

            <View style={styles.submitContainer}>
              <AppFormSubmit title={t.submit} />
            </View>
          </AppForm>
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
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.dark.foreground,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.mutedForeground,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },
  submitContainer: {
    marginTop: 10,
  },
});
