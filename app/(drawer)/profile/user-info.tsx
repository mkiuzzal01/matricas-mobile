import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AppLayout from "@/components/layouts/AppLayout";
import { Colors } from "@/theme/colors";
import { useAppSelector } from "@/redux/hooks/appHook";
import { useGetCurrentUserQuery } from "@/redux/features/auth/auth.api";
import LoadingView from "@/components/shared/LoadingView";
import ErrorView from "@/components/shared/EmptyView";
import { router } from "expo-router";

const translations = {
  en: {
    title: "User Profile",
    name: "Name",
    email: "Email",
    phone: "Phone",
    location: "Location",
    memberSince: "Member Since",
    valuationsCompleted: "Valuations",
    savedReports: "Saved Reports",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
  },
  de: {
    title: "Benutzerprofil",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    location: "Standort",
    memberSince: "Mitglied seit",
    valuationsCompleted: "Bewertungen",
    savedReports: "Berichte",
    editProfile: "Profil bearbeiten",
    changePassword: "Passwort ändern",
  },
};

export default function UserInfo() {
  const lang = useAppSelector((state) => state.root.language.lang);
  const reduxUser = useAppSelector((state) => state.root.auth.user);

  const { data, isLoading, isError } = useGetCurrentUserQuery(null);

  console.log(data);

  // ✅ single source of truth
  const user = useMemo(() => {
    return data?.data || reduxUser;
  }, [data, reduxUser]);

  const t = translations[lang];

  const hanEditPress = () => {
    router.push("/(drawer)/profile/edit-profile");
  };

  const hanChangePasswordPress = () => {
    router.push("/(drawer)/profile/update-pass");
  };

  // avatar fallback
  const avatar = useMemo(() => {
    if (user?.avatar) return user.avatar;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User",
    )}&background=6366f1&color=fff`;
  }, [user]);

  if (isLoading) {
    return (
      <AppLayout>
        <LoadingView />
      </AppLayout>
    );
  }
  if (isError) {
    return (
      <AppLayout>
        <ErrorView />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{t.title}</Text>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <Image source={{ uri: avatar }} style={styles.avatar} />

          <Text style={styles.profileName}>{user?.name || "Guest User"}</Text>

          <Text style={styles.profileEmail}>{user?.email || "No email"}</Text>

          {/* STATS (fallback-safe) */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>0</Text>
              <Text style={styles.statLabel}>{t.valuationsCompleted}</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statNum}>0</Text>
              <Text style={styles.statLabel}>{t.savedReports}</Text>
            </View>
          </View>
        </View>

        {/* INFO SECTION */}
        <View style={styles.infoSection}>
          <InfoRow label={t.name} value={user?.name} />
          <InfoRow label={t.email} value={user?.email} />
          <InfoRow label={t.phone} value={user?.phone} />
          <InfoRow label={t.location} value={"—"} />

          <InfoRow
            label={t.memberSince}
            value={
              user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "—"
            }
          />
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={hanEditPress} style={styles.primaryBtn}>
            <Text style={styles.primaryText}>{t.editProfile}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={hanChangePasswordPress}
            style={styles.secondaryBtn}
          >
            <Text style={styles.secondaryText}>{t.changePassword}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
}

/* ---------- SMALL COMPONENT ---------- */
function InfoRow({ label, value }: any) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "—"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  pageTitle: {
    color: "#5a9e8e",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 20,
  },

  profileCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#5a9e8e",
    marginBottom: 12,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.dark.foreground,
  },

  profileEmail: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
    marginTop: 4,
  },

  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
    paddingTop: 16,
    width: "100%",
  },

  statBox: {
    flex: 1,
    alignItems: "center",
  },

  statNum: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5a9e8e",
  },

  statLabel: {
    fontSize: 10,
    color: Colors.dark.mutedForeground,
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  infoSection: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  infoLabel: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
  },

  infoValue: {
    fontSize: 13,
    color: Colors.dark.foreground,
    fontWeight: "500",
  },

  actionsContainer: {
    flexDirection: "row",
    gap: 10,
  },

  primaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "rgba(90,158,142,0.9)",
    alignItems: "center",
  },

  primaryText: {
    color: "#080d12",
    fontSize: 12,
    fontWeight: "600",
  },

  secondaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },

  secondaryText: {
    color: Colors.dark.foreground,
    fontSize: 12,
    fontWeight: "600",
  },
});
