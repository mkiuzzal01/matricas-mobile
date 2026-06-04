import AppFormSubmit from "@/components/buttons/AppFormSubmit";
import SocialLogin from "@/components/shared/SocialLogin";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hooks";
import { Colors } from "@/theme/colors";
import { toast } from "@/utils/toast";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo } from "react";
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
import AppForm from "../AppForm";
import DateInput from "../inputs/DateInput";
import SelectInput from "../inputs/SelectInput";
import AppTextInput from "../inputs/TextInput";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export default function RegisterForm() {
  const lang = useAppSelector((state) => state.root.language.lang);
  const [register, { isLoading }] = useRegisterMutation();

  const t = useMemo(
    () =>
      lang === "de"
        ? {
            title: "Konto erstellen",
            subtitle: "Registrieren Sie sich, um fortzufahren",

            nameLabel: "Name",
            namePlaceholder: "John Doe",
            nameRequired: "Name ist erforderlich",

            emailLabel: "E-Mail-Adresse",
            emailPlaceholder: "name@beispiel.de",
            emailRequired: "E-Mail ist erforderlich",
            emailInvalid: "Ungültige E-Mail-Adresse",

            genderLabel: "Geschlecht",
            genderPlaceholder: "Geschlecht auswählen",

            dobLabel: "Geburtsdatum",
            dobPlaceholder: "Datum auswählen",

            passwordLabel: "Passwort",
            passwordPlaceholder: "••••••••",
            passwordRequired: "Passwort ist erforderlich",
            passwordMinLength: "Mindestens 6 Zeichen erforderlich",

            submit: "Registrieren",
            haveAccount: "Haben Sie bereits ein Konto?",
            login: "Einloggen",

            orContinue: "Oder fortfahren mit",
          }
        : {
            title: "Create Account",
            subtitle: "Sign up to start using Métricas",

            nameLabel: "Full Name",
            namePlaceholder: "John Doe",
            nameRequired: "Name is required",

            emailLabel: "Email Address",
            emailPlaceholder: "name@example.com",
            emailRequired: "Email is required",
            emailInvalid: "Invalid email address",

            genderLabel: "Gender",
            genderPlaceholder: "Select gender",

            dobLabel: "Date of Birth",
            dobPlaceholder: "Select date",

            passwordLabel: "Password",
            passwordPlaceholder: "••••••••",
            passwordRequired: "Password is required",
            passwordMinLength: "Password must be at least 6 characters",

            submit: "Sign Up",
            haveAccount: "Already have an account?",
            login: "Login",

            orContinue: "Or continue with",
          },
    [lang],
  );

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      const res = await register(data).unwrap();

      const message = res?.message || "Account created successfully";

      toast.success(message);

      reset();
      router.push({
        pathname: "/verify",
        params: { email: data?.email },
      });
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || error?.message || "Something went wrong";

      toast.error(errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="person-add" size={32} color="#fff" />
            </View>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>
          </View>
          <AppForm onSubmit={onSubmit}>
            <AppTextInput
              name="name"
              label={t.nameLabel}
              placeholder={t.namePlaceholder}
              autoCapitalize="words"
              leftIcon="person-outline"
              rules={{
                required: t.nameRequired,
              }}
            />

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
                  value: EMAIL_REGEX,
                  message: t.emailInvalid,
                },
              }}
            />

            <SelectInput
              name="gender"
              label={t.genderLabel}
              placeholder={t.genderPlaceholder}
              options={GENDER_OPTIONS}
            />

            <DateInput
              name="d_o_b"
              label={t.dobLabel}
              placeholder={t.dobPlaceholder}
            />

            <AppTextInput
              name="password"
              label={t.passwordLabel}
              placeholder={t.passwordPlaceholder}
              secureTextEntry
              autoCapitalize="none"
              leftIcon="lock-closed-outline"
              rules={{
                required: t.passwordRequired,
                minLength: {
                  value: 6,
                  message: t.passwordMinLength,
                },
              }}
            />

            <AppFormSubmit title={t.submit} />
          </AppForm>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>{t.orContinue}</Text>
            <View style={styles.line} />
          </View>

          <SocialLogin lang={lang} />
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t.haveAccount} </Text>

            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.link}>{t.login}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/** ---------------- STYLES ---------------- */
const PRIMARY = "#4f46e5";

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
    maxWidth: 420,
    width: "100%",
    alignSelf: "center",
    padding: 28,
    borderRadius: 16,
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.dark.foreground,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.dark.mutedForeground,
    textAlign: "center",
    marginTop: 6,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark.border,
  },

  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: Colors.dark.mutedForeground,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },

  footerText: {
    color: Colors.dark.mutedForeground,
  },

  link: {
    color: PRIMARY,
    fontWeight: "600",
  },
});
