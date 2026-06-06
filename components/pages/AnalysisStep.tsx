import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/redux/hooks/appHook";

interface AnalysisStepProps {
  isLoading: boolean;
  isSuccess: boolean;
  reportId: number | null;
}

export default function AnalysisStep({
  isLoading,
  isSuccess,
  reportId,
}: AnalysisStepProps) {
  const router = useRouter();
  const lang = useAppSelector((state) => state.root.language.lang);
  const { searchCity } = useAppSelector((step) => step.root.survey);

  console.log(
    "isLoading",
    isLoading,
    "reportId",
    reportId,
    "isSuccess",
    isSuccess,
    "isError",
  );
  // -------------------------
  // TRANSLATIONS
  // -------------------------
  const translations = useMemo(
    () => ({
      en: {
        title: "Analyzing Property...",
        steps: [
          { label: "Analyzing data", sub: "Processing location data" },
          { label: "Calculating metrics", sub: "Running AI model" },
          { label: "Generating report", sub: "Building insights" },
          { label: "Finalizing", sub: "Preparing summary" },
        ],
      },
      de: {
        title: "Immobilie wird analysiert...",
        steps: [
          {
            label: "Daten werden analysiert",
            sub: "Verarbeitung von Standortdaten",
          },
          {
            label: "Kennzahlen werden berechnet",
            sub: "AI-Modell wird ausgeführt",
          },
          {
            label: "Bericht wird generiert",
            sub: "Erkenntnisse werden aufbereitet",
          },
          { label: "Abschließen", sub: "Zusammenfassung wird vorbereitet" },
        ],
      },
    }),
    [],
  );

  const text = translations[lang] ?? translations.en;
  const steps = text.steps;

  const [step, setStep] = useState(0);

  // -------------------------
  // ANIMATION VALUES
  // -------------------------
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotAnim = useRef(new Animated.Value(1)).current;

  // -------------------------
  // LOADER ANIMATION (PULSE + BREATHING DOT)
  // -------------------------
  useEffect(() => {
    if (!isLoading || isSuccess) return;

    // Pulse ring
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Breathing dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, {
          toValue: 0.4,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [isLoading, isSuccess]);

  // -------------------------
  // STEP PROGRESSION
  // -------------------------
  useEffect(() => {
    if (!isLoading || isSuccess) return;
    if (step >= steps.length) return;

    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [step, isLoading, isSuccess, steps.length]);

  // -------------------------
  // SUCCESS NAVIGATION
  // -------------------------
  useEffect(() => {
    if (!isSuccess) return;
    router.push({
      pathname: "/result",
      params: {
        id: reportId,
      },
    });
  }, [isSuccess, router, reportId]);

  // -------------------------
  // UI
  // -------------------------
  return (
    <View style={styles.container}>
      {/* LOADER */}
      <View style={styles.loader}>
        <Animated.View
          style={[
            styles.loaderRing,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.3],
                outputRange: [0.4, 0.1],
              }),
            },
          ]}
        />

        <Animated.View
          style={[
            styles.dot,
            {
              opacity: dotAnim,
              transform: [
                {
                  scale: dotAnim.interpolate({
                    inputRange: [0.4, 1],
                    outputRange: [0.8, 1.2],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{text.title}</Text>
        <Text style={styles.subtitle}>{searchCity}</Text>
      </View>

      {/* STEPS */}
      <View style={styles.steps}>
        {steps.map((s, i) => {
          const active = i === step;
          const done = i < step;

          return (
            <View
              key={i}
              style={[
                styles.step,
                active && styles.activeStep,
                done && styles.doneStep,
              ]}
            >
              <View
                style={[
                  styles.stepDot,
                  { backgroundColor: i <= step ? "#5a9e8e" : "#444" },
                ]}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{s.label}</Text>
                <Text style={styles.stepSub}>{s.sub}</Text>
              </View>

              {done && <Text style={styles.check}>✓</Text>}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.dark.background,
  },

  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: "#ffffffaa",
    fontSize: 14,
  },

  subtitle: {
    color: "#ffffffaa",
    fontSize: 14,
    marginTop: 5,
  },
  loader: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "rgba(90,158,142,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  loaderRing: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "rgba(90,158,142,0.12)",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5a9e8e",
  },

  // -------------------------
  // STEPS
  // -------------------------
  steps: {
    width: "100%",
    gap: 10,
  },

  step: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  activeStep: {
    backgroundColor: "rgba(255,255,255,0.06)",
    transform: [{ scale: 1.02 }],
  },

  doneStep: {
    opacity: 0.5,
  },

  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },

  stepTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  stepSub: {
    color: "#888",
    fontSize: 10,
    marginTop: 2,
  },

  check: {
    color: "#5a9e8e",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
