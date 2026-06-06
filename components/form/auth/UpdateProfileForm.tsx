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
  useWindowDimensions,
} from "react-native";

import AppFormSubmit from "@/components/buttons/AppFormSubmit";
import AppForm from "../AppForm";
import DateInput from "../inputs/DateInput";
import FileUploader from "../inputs/FileUploader";
import SelectInput from "../inputs/SelectInput";
import AppTextInput from "../inputs/TextInput";

import { useUpdateProfileMutation } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hooks/appHook";
import { Colors } from "@/theme/colors";
import { toast } from "@/utils/toast";

const PRIMARY = "#5a9e8e";

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export default function UpdateProfile() {
  const { height } = useWindowDimensions();
  const lang = useAppSelector((s) => s.root.language.lang);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const t = useMemo(() => {
    return {
      en: {
        title: "Update Profile",
        subtitle: "Modify your account details",
        name: "Full Name",
        phone: "Phone",
        email: "Email",
        gender: "Gender",
        dob: "Date of Birth",
        submit: "Save Changes",
        back: "Back",
        required: "This field is required",
        invalidEmail: "Invalid email",
      },
      de: {
        title: "Profil bearbeiten",
        subtitle: "Kontodaten aktualisieren",
        name: "Name",
        phone: "Telefon",
        email: "E-Mail",
        gender: "Geschlecht",
        dob: "Geburtsdatum",
        submit: "Speichern",
        back: "Zurück",
        required: "Pflichtfeld",
        invalidEmail: "Ungültige E-Mail",
      },
    }[lang];
  }, [lang]);

  /* ---------------- SUBMIT (FIXED FORM DATA) ---------------- */
  const onSubmit = async (values: FieldValues, reset: () => void) => {
    try {
      const formData = new FormData();

      // helper → avoids repeating checks
      const appendIfExists = (key: string, value: any) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      };

      appendIfExists("name", values.name);
      appendIfExists("phone", values.phone);
      appendIfExists("email", values.email);
      appendIfExists("gender", values.gender);
      appendIfExists("dob", values.dob);

      // ✅ safer avatar handling
      if (values.avatar) {
        // If it's a File (web) or object with uri (native), append directly
        formData.append("avatar", values.avatar as any);
      }

      // Debug: log FormData entries
      for (const [key, value] of (formData as any).entries()) {
        console.log("FormData entry", key, value);
      }

      const res = await updateProfile(formData).unwrap();

      toast.success(res?.message ?? "Profile updated");

      reset();
      router.back();
    } catch (err: any) {
      console.log("UPLOAD ERROR:", err?.data ?? err);
      toast.error(err?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { minHeight: height }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.wrapper}>
          <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.header}>
              <View style={styles.iconBox}>
                <Ionicons name="person" size={28} color="#fff" />
              </View>

              <Text style={styles.title}>{t.title}</Text>
              <Text style={styles.subtitle}>{t.subtitle}</Text>
            </View>

            {/* FORM */}
            <AppForm onSubmit={onSubmit}>
              <AppTextInput
                name="name"
                label={t.name}
                placeholder="John Doe"
                leftIcon="person-outline"
                rules={{ required: t.required }}
              />

              <AppTextInput
                name="phone"
                label={t.phone}
                placeholder="Phone number"
                leftIcon="call-outline"
                rules={{ required: t.required }}
              />

              <AppTextInput
                name="email"
                label={t.email}
                placeholder="email@example.com"
                leftIcon="mail-outline"
                rules={{ required: t.required }}
              />

              <SelectInput
                name="gender"
                label={t.gender}
                options={GENDER_OPTIONS}
              />

              <DateInput name="dob" label={t.dob} placeholder="Select date" />

              {/* ✅ IMAGE UPLOAD FIXED */}
              <FileUploader
                name="avatar"
                label="Profile Image"
                rules={{ required: true }}
              />

              <AppFormSubmit title={t.submit} isLoading={isLoading} />
            </AppForm>

            {/* BACK */}
            <Pressable
              onPress={() => router.back()}
              style={{ marginTop: 16, alignItems: "center" }}
            >
              <Text style={{ color: PRIMARY }}>{t.back}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ---------------- STYLES ---------------- */
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
    padding: 24,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
  },
});
