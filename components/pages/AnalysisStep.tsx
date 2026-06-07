import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Colors } from "@/theme/colors";
import { useAppSelector } from "@/redux/hooks/appHook";

interface Props {
  isLoading?: boolean;
  isSuccess?: boolean;
  type?: "demo";
  onFinish?: () => void;
}

export default function AnalysisStep({
  isLoading,
  isSuccess,
  type,
  onFinish,
}: Props) {
  const lang = useAppSelector((s) => s.root.language.lang);
  const searchCity = useAppSelector((s) => s.root.survey.searchCity);

  const isDemo = type === "demo";
  const isActive = isLoading || isDemo;

  const hasFinished = useRef(false);

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
          { label: "Daten analysieren", sub: "Standortdaten verarbeiten" },
          { label: "Berechnungen", sub: "AI-Modell läuft" },
          { label: "Bericht erstellen", sub: "Erkenntnisse generieren" },
          { label: "Fertigstellung", sub: "Zusammenfassung vorbereiten" },
        ],
      },
    }),
    [],
  );

  const { title, steps } = translations[lang] ?? translations.en;

  const [activeStep, setActiveStep] = useState(0);

  const pulse = useRef(new Animated.Value(1)).current;
  const dot = useRef(new Animated.Value(1)).current;

  // ---------------- ANIMATION ----------------
  useEffect(() => {
    if (!isActive || isSuccess) return;

    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    const dotAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(dot, {
          toValue: 0.4,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnim.start();
    dotAnim.start();

    return () => {
      pulseAnim.stop();
      dotAnim.stop();
    };
  }, [isActive, isSuccess]);

  // ---------------- STEP FLOW ----------------
  useEffect(() => {
    if (!isActive || isSuccess) return;

    const timer = setTimeout(() => {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, 700);

    return () => clearTimeout(timer);
  }, [activeStep, isActive, isSuccess, steps.length]);

  // ---------------- RESET ----------------
  useEffect(() => {
    if (isActive) {
      setActiveStep(0);
      hasFinished.current = false;
    }
  }, [isActive]);

  // ---------------- FINAL + REDIRECT ----------------
  useEffect(() => {
    if (!isActive || hasFinished.current) return;

    if (activeStep === steps.length - 1) {
      hasFinished.current = true;

      const delay = isDemo ? 900 : 500;

      const timer = setTimeout(() => {
        onFinish?.();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [activeStep, isActive, isDemo, steps.length]);

  return (
    <View style={styles.container}>
      {/* LOADER */}
      <View style={styles.loader}>
        <Animated.View
          style={[
            styles.ring,
            {
              transform: [{ scale: pulse }],
              opacity: pulse.interpolate({
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
              opacity: dot,
              transform: [
                {
                  scale: dot.interpolate({
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
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{searchCity}</Text>

      {/* STEPS */}
      <View style={styles.steps}>
        {steps.map((s, i) => {
          const done = i < activeStep;
          const active = i === activeStep;

          return (
            <View
              key={i}
              style={[
                styles.step,
                done && styles.done,
                active && styles.active,
              ]}
            >
              <View
                style={[
                  styles.dotSmall,
                  { backgroundColor: i <= activeStep ? "#5a9e8e" : "#444" },
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

  ring: {
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

  title: {
    color: "#fff",
    fontSize: 14,
  },

  subtitle: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 20,
  },

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

  active: {
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  done: {
    opacity: 0.5,
  },

  dotSmall: {
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
  },

  check: {
    color: "#5a9e8e",
    fontSize: 14,
    fontWeight: "bold",
  },
});
