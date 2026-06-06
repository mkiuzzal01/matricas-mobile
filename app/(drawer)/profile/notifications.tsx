import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useGetNotificationQuery } from "@/redux/features/auth/auth.api";
import { Colors } from "@/theme/colors";
import AppLayout from "@/components/layouts/AppLayout";
import LoadingView from "@/components/shared/LoadingView";
import ErrorView from "@/components/shared/ErrorView";

export default function Notifications() {
  const { data, isLoading, error } = useGetNotificationQuery(null);

  const notifications = data?.data ?? [];

  if (isLoading) {
    return (
      <AppLayout>
        <LoadingView />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <ErrorView message="Failed to load notifications" />
      </AppLayout>
    );
  }

  if (!notifications.length) {
    return (
      <AppLayout>
        <View style={styles.center}>
          <Text style={styles.muted}>No notifications yet</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => String(item.id ?? index)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              {!!item.message && (
                <Text style={styles.message}>{item.message}</Text>
              )}
            </View>
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  muted: {
    marginTop: 8,
    color: Colors.dark.mutedForeground,
    fontSize: 13,
  },

  error: {
    color: "#ff4d4d",
    fontSize: 14,
  },

  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dark.foreground,
  },

  message: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.dark.mutedForeground,
  },
});
