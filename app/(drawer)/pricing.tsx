import React, { useMemo, useCallback } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import AppLayout from "@/components/layouts/AppLayout";
import { Colors } from "@/theme/colors";
import {
  usePricingPlansQuery,
  usePurchaseSubscriptionMutation,
} from "@/redux/features/subscription/subscription.api";

import LoadingView from "@/components/shared/LoadingView";
import ErrorView from "@/components/shared/ErrorView";
import { toast } from "@/utils/toast";

type Plan = {
  id: number;
  name: string;
  price: number;
  currency: string;
  duration?: number;
  duration_type?: string;
  description?: string;
  features?: string[];
  is_highlighted?: boolean;
};

type Section = {
  title: string;
  data: Plan[];
};

export default function Pricing() {
  const { data, isLoading, error } = usePricingPlansQuery();
  const [purchaseSubscription, { isLoading: isPurchasing }] =
    usePurchaseSubscriptionMutation();

  // ✅ Normalize API data safely
  const sections: Section[] = useMemo(() => {
    const plans = data?.data;

    if (!plans) return [];

    return [
      {
        title: "Subscription Plans",
        data: plans.subscription_plans ?? [],
      },
      {
        title: "One-Time Plans",
        data: plans.one_time_plans ?? [],
      },
    ].filter((s) => s.data.length > 0);
  }, [data]);

  // ✅ Purchase handler
  const handlePurchase = useCallback(
    async (plan: Plan) => {
      if (isPurchasing) return;
      try {
        const res: any = await purchaseSubscription({
          plan_id: plan.id,
        }).unwrap();
        if (res?.message) {
          toast.success(res.message);
        }
      } catch (error: any) {
        toast.error(error.data.message || "Failed to purchase plan");
      }
    },
    [purchaseSubscription, isPurchasing],
  );

  // ✅ Render plan card (optimized)
  const renderPlan = useCallback(
    ({ item }: { item: Plan }) => {
      return <PlanCard plan={item} onPress={() => handlePurchase(item)} />;
    },
    [handlePurchase],
  );

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
        <ErrorView message="Failed to load pricing plans" />
      </AppLayout>
    );
  }

  if (!sections.length) {
    return (
      <AppLayout>
        <View style={styles.center}>
          <Text style={styles.empty}>No plans available</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Pricing Plans</Text>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPlan}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </AppLayout>
  );
}

/* ---------------- PLAN CARD ---------------- */

const PlanCard = React.memo(
  ({ plan, onPress }: { plan: Plan; onPress: () => void }) => {
    return (
      <View style={[styles.card, plan.is_highlighted && styles.highlightCard]}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{plan.name}</Text>

          {plan.is_highlighted && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Popular</Text>
            </View>
          )}
        </View>

        {/* PRICE */}
        <Text style={styles.price}>
          {plan.currency} {plan.price}
          {plan.duration ? (
            <Text style={styles.duration}>
              {" "}
              / {plan.duration} {plan.duration_type}
            </Text>
          ) : null}
        </Text>

        {/* DESCRIPTION */}
        {!!plan.description && (
          <Text style={styles.description}>{plan.description}</Text>
        )}

        {/* FEATURES */}
        {!!plan.features?.length && (
          <View style={styles.features}>
            {plan.features.map((f) => (
              <Text key={f} style={styles.featureItem}>
                • {f}
              </Text>
            ))}
          </View>
        )}

        {/* BUTTON */}
        <Text style={styles.button} onPress={onPress}>
          Choose Plan
        </Text>
      </View>
    );
  },
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.dark.foreground,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5a9e8e",
    marginBottom: 10,
    marginTop: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    color: Colors.dark.mutedForeground,
  },

  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },

  highlightCard: {
    borderColor: "#5a9e8e",
    borderWidth: 1.5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark.foreground,
  },

  badge: {
    backgroundColor: "#5a9e8e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },

  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#5a9e8e",
    marginTop: 8,
  },

  duration: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
  },

  description: {
    fontSize: 12,
    color: Colors.dark.mutedForeground,
    marginTop: 8,
  },

  features: {
    marginTop: 10,
  },

  featureItem: {
    fontSize: 12,
    color: Colors.dark.foreground,
    marginBottom: 4,
  },

  button: {
    marginTop: 12,
    backgroundColor: "#5a9e8e",
    paddingVertical: 10,
    borderRadius: 10,
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});
