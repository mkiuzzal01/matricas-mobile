import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AppLayout from "../layouts/AppLayout";
import { Colors } from "@/theme/colors";
import { router } from "expo-router";
import { useAppSelector } from "@/redux/hooks";

const translations = {
  en: {
    label: "Data-driven real estate intelligence",
    heading1: "Property Valuation.",
    heading2: "In seconds.",
    subHeading: "Not weeks.",
    description:
      "Professional AVM valuation with 20+ data points. Aggregated from 4 independent data sources. For buyers, owners and professionals.",
    startBtn: "Start Valuation",
    demoBtn: "Live Demo",
  },
  de: {
    label: "Datengetriebene Immobilienanalyse",
    heading1: "Immobilienbewertung.",
    heading2: "In Sekunden.",
    subHeading: "Nicht Wochen.",
    description:
      "Professionelle AVM-Bewertung mit über 20 Datenpunkten. Aggregiert aus 4 unabhängigen Datenquellen. Für Käufer, Eigentümer und Profis.",
    startBtn: "Bewertung starten",
    demoBtn: "Live-Demo",
  },
};

export default function InitialStep() {
  const lang = useAppSelector((state) => state.root.language.lang);
  const text = translations[lang];

  const handleNavigate = () => {
    router.push("/search");
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.label}>{text.label}</Text>

        <Text style={styles.heading1}>{text.heading1}</Text>
        <Text style={styles.heading2}>{text.heading2}</Text>

        <Text style={styles.subHeading}>{text.subHeading}</Text>

        <Text style={styles.description}>{text.description}</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={handleNavigate}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>{text.startBtn}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNavigate}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>{text.demoBtn}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: Colors.dark.background,
  },
  label: {
    fontSize: 14,
    color: Colors.dark.mutedForeground,
    marginBottom: 8,
  },
  heading1: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.dark.foreground,
  },
  heading2: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.dark.foreground,
  },
  subHeading: {
    fontSize: 18,
    marginTop: 5,
    color: Colors.dark.mutedForeground,
  },
  description: {
    marginTop: 15,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.dark.foreground,
    opacity: 0.8,
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 25,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: Colors.dark.primaryForeground,
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.dark.border,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.dark.card,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: Colors.dark.foreground,
    fontWeight: "600",
  },
});
