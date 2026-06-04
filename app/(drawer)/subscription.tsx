import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppLayout from "@/components/layouts/AppLayout";
import { Colors } from "@/theme/colors";
import { useAppSelector } from "@/redux/hooks/appHook";

const translations = {
  en: {
    title: "Subscription Plan",
    currentPlan: "Current Plan",
    proPlan: "Pro Plan",
    price: "€49.00 / month",
    nextBillingDate: "Next Renewal Date",
    valueBillingDate: "July 3rd, 2026",
    paymentMethod: "Payment Method",
    cardEnding: "Visa ending in 4242",
    featuresTitle: "Plan Inclusions",
    features: [
      "Infinite automated valuations (AVM)",
      "High-quality PDF downloads",
      "Advanced AI market forecasts",
      "Neighborhood infrastructure score breakdown",
    ],
    actionBtn: "Manage Subscription",
  },
  de: {
    title: "Abonnement",
    currentPlan: "Aktueller Plan",
    proPlan: "Pro-Abonnement",
    price: "49,00 € / Monat",
    nextBillingDate: "Nächstes Verlängerungsdatum",
    valueBillingDate: "3. Juli 2026",
    paymentMethod: "Zahlungsmethode",
    cardEnding: "Visa mit Endung 4242",
    featuresTitle: "Abonnement-Leistungen",
    features: [
      "Unbegrenzte automatisierte Bewertungen (AVM)",
      "Hochwertige PDF-Exporte und -Downloads",
      "Erweiterte KI-Marktprognosen",
      "Detaillierte Analyse des Lage-Infrastruktur-Scores",
    ],
    actionBtn: "Abonnement verwalten",
  },
};

export default function Subscription() {
  const lang = useAppSelector((state) => state.root.language.lang);
  const t = translations[lang];

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{t.title}</Text>

        {/* PLAN OVERVIEW CARD */}
        <View style={styles.planCard}>
          <Text style={styles.planLabel}>{t.currentPlan}</Text>
          <Text style={styles.planName}>{t.proPlan}</Text>
          <Text style={styles.planPrice}>{t.price}</Text>
        </View>

        {/* DETAILS LIST */}
        <View style={styles.detailsBox}>
          <View style={styles.row}>
            <Text style={styles.detailLabel}>{t.nextBillingDate}</Text>
            <Text style={styles.detailValue}>{t.valueBillingDate}</Text>
          </View>
          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>{t.paymentMethod}</Text>
            <Text style={styles.detailValue}>{t.cardEnding}</Text>
          </View>
        </View>

        {/* INCLUSIONS SECTION */}
        <Text style={styles.sectionTitle}>{t.featuresTitle}</Text>
        <View style={styles.featuresBox}>
          {t.features.map((feature, idx) => (
            <View key={idx} style={styles.featureItem}>
              <Text style={styles.bullet}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* ACTION BUTTON */}
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
          <Text style={styles.primaryText}>{t.actionBtn}</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
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
  planCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#5a9e8e", // highlight active plan with premium color border
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  planLabel: {
    fontSize: 10,
    color: Colors.dark.mutedForeground,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  planName: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark.foreground,
    marginTop: 8,
  },
  planPrice: {
    fontSize: 16,
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
    alignItems: "flex-start",
    gap: 8,
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
    lineHeight: 18,
  },
  primaryBtn: {
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "rgba(90,158,142,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#080d12",
    fontSize: 12,
    fontWeight: "600",
  },
});
