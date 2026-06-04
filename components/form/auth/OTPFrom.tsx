import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import OTPInput from "../inputs/OTPInput";

import {
  useResendOTPMutation,
  useVerifyForgotOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";

import { Colors } from "@/theme/colors";
import { toast } from "@/utils/toast";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks/appHook";

const RESEND_DELAY = 30;

const translations = {
  en: {
    title: "Verify OTP",
    subtitle: "Enter the 6-digit code sent to your email",
    submit: "Verify",
    resend: "Resend OTP",
    resendIn: "Resend OTP in",
    sending: "Sending...",
  },
  de: {
    title: "OTP bestätigen",
    subtitle: "Geben Sie den 6-stelligen Code ein",
    submit: "Bestätigen",
    resend: "OTP erneut senden",
    resendIn: "OTP erneut senden in",
    sending: "Wird gesendet...",
  },
};

export default function OTPForm({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const { height } = useWindowDimensions();
  const lang = useAppSelector((state) => state.root.language.lang);

  const t = useMemo(
    () => (lang === "de" ? translations.de : translations.en),
    [lang],
  );

  const [timer, setTimer] = useState(RESEND_DELAY);

  const [verifyOtp, { isLoading: verifyLoading }] = useVerifyOtpMutation();
  const [verifyForgotOtp] = useVerifyForgotOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOTPMutation();

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timer <= 0) return;

    const id = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [timer]);

  /* ---------------- VERIFY ---------------- */
  const onSubmit = useCallback(
    async (data: FieldValues, reset: () => void) => {
      try {
        if (!otp) {
          const res = await verifyOtp({
            email,
            otp: data.code,
          }).unwrap();

          console.log("verify otp response:", res);

          toast.success(res?.message || "OTP verified");

          reset();
          router.replace("/login");
          return;
        }

        const res = await verifyForgotOtp({
          otp,
          email,
        }).unwrap();

        console.log("verfy forgot otp response:", res);
        toast.success(res?.message || "OTP verified");

        reset();

        router.push({
          pathname: "/reset",
          params: { email, otp },
        });
      } catch (error: any) {
        toast.error(error?.data?.message || "Verification failed");
      }
    },
    [email, otp],
  );

  /* ---------------- RESEND ---------------- */
  const handleResendOTP = useCallback(async () => {
    if (timer > 0 || resendLoading) return;

    try {
      const res = await resendOtp({ email }).unwrap();

      toast.success(res?.message || "OTP sent");

      setTimer(RESEND_DELAY);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  }, [timer, resendLoading, email]);

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
            {/* TITLE */}
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>

            {/* FORM */}
            <AppForm onSubmit={onSubmit}>
              <OTPInput
                name="code"
                rules={{
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be 6 digits",
                  },
                }}
              />

              <AppFormSubmit title={t.submit} isLoading={verifyLoading} />

              {/* RESEND */}
              <View style={styles.resendContainer}>
                {timer > 0 ? (
                  <Text style={styles.timerText}>
                    {t.resendIn} {timer}s
                  </Text>
                ) : (
                  <Pressable onPress={handleResendOTP} disabled={resendLoading}>
                    <Text style={styles.resendText}>
                      {resendLoading ? t.sending : t.resend}
                    </Text>
                  </Pressable>
                )}
              </View>
            </AppForm>
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
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    color: Colors.dark.mutedForeground,
  },

  resendContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  timerText: {
    fontSize: 14,
    color: Colors.dark.mutedForeground,
  },

  resendText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dark.primary,
  },
});
