import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppForm from "../AppForm";
import AppTextInput from "../inputs/TextInput";
import AppFormSubmit from "@/components/buttons/AppFormSubmit";
import SocialLogin from "@/components/shared/SocialLogin";
import SelectInput from "../inputs/SelectInput";
import DateInput from "../inputs/DateInput";

import { useAppSelector } from "@/redux/hooks";
import { Colors } from "@/theme/colors";

/** ---------------- TYPES ---------------- */
type RegisterFormData = {
  name: string;
  email: string;
  gender: string;
  dob: string;
  password: string;
};

/** ---------------- CONSTANTS ---------------- */
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

/** ---------------- REGISTER SCREEN ---------------- */
export default function RegisterForm() {
  const lang = useAppSelector((state) => state.language.lang);

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

  /** ---------------- SUBMIT ---------------- */
  const onSubmit = async (data: RegisterFormData, reset: () => void) => {
    try {
      console.log("REGISTER DATA:", data);

      // TODO: API CALL

      reset();
      router.replace("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error);
    }
  };

  /** ---------------- UI ---------------- */
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
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="person-add" size={32} color="#fff" />
            </View>

            <Text style={styles.title}>{t.title}</Text>

            <Text style={styles.subtitle}>{t.subtitle}</Text>
          </View>

          {/* FORM */}
          <AppForm<RegisterFormData>
            defaultValues={{
              name: "",
              email: "",
              gender: "",
              dob: "",
              password: "",
            }}
            onSubmit={onSubmit}
          >
            <AppTextInput<RegisterFormData>
              name="name"
              label={t.nameLabel}
              placeholder={t.namePlaceholder}
              autoCapitalize="words"
              leftIcon="person-outline"
              rules={{
                required: t.nameRequired,
              }}
            />

            <AppTextInput<RegisterFormData>
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

            <SelectInput<RegisterFormData>
              name="gender"
              label={t.genderLabel}
              placeholder={t.genderPlaceholder}
              options={GENDER_OPTIONS}
            />

            <DateInput<RegisterFormData>
              name="dob"
              label={t.dobLabel}
              placeholder={t.dobPlaceholder}
            />

            <AppTextInput<RegisterFormData>
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

            {/* SUBMIT */}
            <AppFormSubmit title={t.submit} />
          </AppForm>

          {/* DIVIDER */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>{t.orContinue}</Text>
            <View style={styles.line} />
          </View>

          {/* SOCIAL LOGIN */}
          <SocialLogin lang={lang} />

          {/* FOOTER */}
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
