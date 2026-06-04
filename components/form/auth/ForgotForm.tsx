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
import { useForgotMutation } from "@/redux/features/auth/auth.api";
import { toast } from "@/utils/toast";
import { useAppSelector } from "@/redux/hooks/appHook";

const translations = {
  en: {
    title: "Forgot Password",
    subtitle:
      "Enter your email and we’ll send you a verification code to reset your password",
    emailLabel: "Email Address",
    emailPlaceholder: "name@example.com",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email address",
    submit: "Send Reset Code",
    backToLogin: "Back to Login",
    successMsg: "Reset code sent successfully!",
    errorMsg: "Failed to send reset code",
  },
  de: {
    title: "Passwort vergessen",
    subtitle:
      "Geben Sie Ihre E-Mail ein und wir senden Ihnen einen Bestätigungscode",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "name@beispiel.de",
    emailRequired: "E-Mail ist erforderlich",
    emailInvalid: "Ungültige E-Mail-Adresse",
    submit: "Code senden",
    backToLogin: "Zurück zum Login",
    successMsg: "Code erfolgreich gesendet!",
    errorMsg: "Fehler beim Senden des Codes",
  },
};
export default function ForgotForm() {
  const { height } = useWindowDimensions();
  const [forgotPassword] = useForgotMutation();
  const lang = useAppSelector((state) => state.root.language.lang);
  const t = translations[lang];

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      const res = await forgotPassword(data).unwrap();

      console.log("forgot response:", res);
      toast.info(res?.message || t.successMsg);

      reset();

      router.push({
        pathname: "/verify",
        params: {
          email: data.email,
          otp: res?.data?.otp?.token,
        },
      });
    } catch (error: any) {
      toast.error(error?.data?.message || t.errorMsg);
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
            <View style={styles.header}>
              <View style={styles.iconBox}>
                <Ionicons name="mail-outline" size={28} color="#fff" />
              </View>

              <Text style={styles.title}>{t.title}</Text>
              <Text style={styles.subtitle}>{t.subtitle}</Text>
            </View>

            {/* FORM */}
            <AppForm defaultValues={{ email: "" }} onSubmit={onSubmit}>
              <AppTextInput
                name="email"
                label={t.emailLabel}
                placeholder={t.emailPlaceholder}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="mail-outline"
                rules={{
                  required: t.emailRequired,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t.emailInvalid,
                  },
                }}
              />

              <AppFormSubmit title={t.submit} />
            </AppForm>

            {/* BACK */}
            <Pressable
              onPress={() => router.push("/login")}
              style={({ pressed }) => [
                styles.backButton,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Ionicons name="arrow-back" size={16} color="#6366f1" />
              <Text style={styles.backText}>{t.backToLogin}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const PRIMARY = "#4f46e5";

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
    maxWidth: 420,
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

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.dark.foreground,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: Colors.dark.mutedForeground,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
    paddingHorizontal: 6,
  },

  backButton: {
    marginTop: 18,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    gap: 6,
  },

  backText: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "600",
  },
});
