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
import { Colors } from "@/theme/colors";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { FieldValues } from "react-hook-form";
import { toast } from "@/utils/toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/appHook";
import { setUser } from "@/redux/features/auth/auth.slice";

type LoginFormData = {
  email: string;
  password: string;
};

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.root.language.lang);
  const [login] = useLoginMutation();

  const t =
    lang === "de"
      ? {
          title: "Willkommen zurück",
          subtitle: "Einloggen, um mit Métricas fortzufahren",
          emailLabel: "E-Mail-Adresse",
          emailPlaceholder: "name@beispiel.de",
          emailRequired: "E-Mail ist erforderlich",
          emailInvalid: "Ungültige E-Mail-Adresse",
          passwordLabel: "Passwort",
          passwordPlaceholder: "••••••••",
          passwordRequired: "Passwort ist erforderlich",
          passwordMinLength: "Mindestens 6 Zeichen erforderlich",
          forgotPassword: "Passwort vergessen?",
          submit: "Einloggen",
          noAccount: "Kein Konto?",
          signUp: "Registrieren",
          orContinue: "Oder fortfahren mit",
        }
      : {
          title: "Welcome Back",
          subtitle: "Login to continue to Métricas",
          emailLabel: "Email Address",
          emailPlaceholder: "name@example.com",
          emailRequired: "Email is required",
          emailInvalid: "Invalid email address",
          passwordLabel: "Password",
          passwordPlaceholder: "••••••••",
          passwordRequired: "Password is required",
          passwordMinLength: "Password must be at least 6 characters",
          forgotPassword: "Forgot Password?",
          submit: "Login",
          noAccount: "Don't have an account?",
          signUp: "Sign Up",
          orContinue: "Or continue with",
        };

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      const res = await login(data as LoginFormData).unwrap();
      if (res?.message) {
        toast.info(res?.message);
        dispatch(
          setUser({
            user: res?.data?.user,
            token: res?.data?.token,
            tokenType: res?.data?.token_type,
          }),
        );
        reset();
        router.replace("/home");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
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
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="trending-up" size={32} color="#fff" />
            </View>

            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>
          </View>

          {/* FORM */}
          <AppForm
            defaultValues={{
              email: "",
              password: "",
            }}
            onSubmit={onSubmit}
          >
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

            {/* FORGOT PASSWORD */}
            <Pressable
              onPress={() => router.push("/forgot")}
              style={({ pressed }) => [
                styles.forgot,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Text style={styles.forgotText}>{t.forgotPassword}</Text>
            </Pressable>

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
            <Text style={styles.footerText}>{t.noAccount} </Text>

            <Pressable onPress={() => router.push("/register")}>
              <Text style={styles.link}>{t.signUp}</Text>
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

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },

  forgotText: {
    color: PRIMARY,
    fontSize: 14,
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
