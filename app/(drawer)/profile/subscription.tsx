import AppLayout from "@/components/layouts/AppLayout";
import {
  default as EmptyView,
  default as ErrorView,
} from "@/components/shared/EmptyView";
import LoadingView from "@/components/shared/LoadingView";
import { useGetSubscriptionsQuery } from "@/redux/features/subscription/subscription.api";
import { useAppSelector } from "@/redux/hooks/appHook";
import { Colors } from "@/theme/colors";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Subscription() {
  const lang = useAppSelector((state) => state.root.language.lang);
  const { data, isLoading, isError } = useGetSubscriptionsQuery();

  const subscription = data?.data;

  console.log("Subscription Data:", subscription);

  const t = {
    en: {
      title: "Subscription Plan",
      currentPlan: "Current Plan",
      nextBillingDate: "Next Renewal Date",
      paymentMethod: "Payment Method",
      featuresTitle: "Plan Inclusions",
      noPlan: "No active subscription",
    },
    de: {
      title: "Abonnement",
      currentPlan: "Aktueller Plan",
      nextBillingDate: "Nächstes Verlängerungsdatum",
      paymentMethod: "Zahlungsmethode",
      featuresTitle: "Leistungen",
      noPlan: "Kein aktives Abonnement",
    },
  }[lang];

  const formatDate = (date?: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  const planName = subscription?.plan?.name || t.noPlan;

  const features = useMemo(() => {
    return subscription?.plan?.features ?? [];
  }, [subscription]);

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
        <ErrorView message="Failed to load subscription" />
      </AppLayout>
    );
  }

  if (!subscription) {
    return (
      <AppLayout>
        <EmptyView message={t.noPlan} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{t.title}</Text>

        {/* PLAN CARD */}
        <View style={styles.planCard}>
          <Text style={styles.planLabel}>{t.currentPlan}</Text>
          <Text style={styles.planName}>{planName}</Text>

          <Text style={styles.planPrice}>
            {subscription.plan?.type?.toUpperCase()}
          </Text>
        </View>

        {/* DETAILS */}
        <View style={styles.detailsBox}>
          <View style={styles.row}>
            <Text style={styles.detailLabel}>{t.nextBillingDate}</Text>
            <Text style={styles.detailValue}>
              {formatDate(subscription.end_date)}
            </Text>
          </View>

          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={styles.detailValue}>{subscription.status}</Text>
          </View>
        </View>

        {/* FEATURES */}
        <Text style={styles.sectionTitle}>{t.featuresTitle}</Text>

        <View style={styles.featuresBox}>
          {features.length > 0 ? (
            features.map((feature: string, idx: number) => (
              <View key={idx} style={styles.featureItem}>
                <Text style={styles.bullet}>✓</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.detailValue}>No features available</Text>
          )}
        </View>
      </View>
    </AppLayout>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  center: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.dark.mutedForeground,
  },

  pageTitle: {
    color: "#5a9e8e",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 20,
  },

  planCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#5a9e8e",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },

  planLabel: {
    fontSize: 10,
    color: Colors.dark.mutedForeground,
    textTransform: "uppercase",
  },

  planName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.dark.foreground,
    marginTop: 8,
    textAlign: "center",
  },

  planPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5a9e8e",
    marginTop: 6,
  },

  detailsBox: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  detailLabel: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
  },

  detailValue: {
    fontSize: 13,
    color: Colors.dark.foreground,
    fontWeight: "500",
  },

  sectionTitle: {
    fontSize: 11,
    textTransform: "uppercase",
    color: Colors.dark.mutedForeground,
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  featuresBox: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },

  featureItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },

  bullet: {
    fontSize: 14,
    color: "#5a9e8e",
    fontWeight: "bold",
  },

  featureText: {
    fontSize: 13,
    color: Colors.dark.foreground,
    flex: 1,
  },

  primaryBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "rgba(90,158,142,0.9)",
    alignItems: "center",
  },

  primaryText: {
    color: "#080d12",
    fontSize: 12,
    fontWeight: "600",
  },
});
