import AppLayout from "@/components/layouts/AppLayout";
import ErrorView from "@/components/shared/ErrorView";
import LoadingView from "@/components/shared/LoadingView";
import { useGetPageQuery } from "@/redux/features/dynamic/dynamic.api";
import { useAppSelector } from "@/redux/hooks/appHook";
import { Colors } from "@/theme/colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Terms() {
  const lang = useAppSelector((state) => state.root.language.lang);
  const { data, isLoading, isError } = useGetPageQuery(2);

  const t = {
    en: {
      pageLabel: "Terms & Conditions",
      empty: "No content available",
    },
    de: {
      pageLabel: "Allgemeine Geschäftsbedingungen",
      empty: "Keine Inhalte verfügbar",
    },
  }[lang];

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
        <ErrorView message="Failed to load terms & conditions." />
      </AppLayout>
    );
  }

  const page = data?.data;

  return (
    <AppLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageLabel}>{t.pageLabel}</Text>

        <View style={styles.card}>
          <Text style={styles.title}>{page?.title || t.pageLabel}</Text>

          <Text style={styles.content}>{page?.content || t.empty}</Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  pageLabel: {
    color: "#5a9e8e",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 20,
  },

  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.dark.foreground,
    marginBottom: 16,
  },

  content: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.dark.foreground,
  },
});
