import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '@/redux/hooks';
import { nextStep } from '@/redux/features/surveySlice';
import { Colors } from '@/theme/colors';

export default function AnalysisStep() {
  const theme = Colors.dark;
  const dispatch = useAppDispatch();

  const [localStep, setLocalStep] = useState(0);

  const steps = [
    { label: 'Analyzing data', sub: 'Processing location data' },
    { label: 'Calculating metrics', sub: 'Running AI model' },
    { label: 'Generating report', sub: 'Building insights' },
    { label: 'Finalizing', sub: 'Preparing summary' },
  ];

  // 🔥 animation engine
  useEffect(() => {
    if (localStep >= steps.length) {
      dispatch(nextStep());
      return;
    }

    const timer = setTimeout(() => {
      setLocalStep((prev) => prev + 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [localStep]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* LOADER */}
      <View style={styles.loader}>
        <View style={styles.loaderRing} />
        <View style={styles.dot} />
      </View>

      {/* STATUS */}
      <Text style={styles.title}>Analyzing Property...</Text>

      {/* STEPS */}
      <View style={styles.steps}>
        {steps.map((s, i) => {
          const active = i === localStep;
          const done = i < localStep;

          return (
            <View
              key={i}
              style={[
                styles.step,
                active && styles.activeStep,
                done && styles.doneStep,
              ]}
            >
              {/* dot */}
              <View
                style={[
                  styles.stepDot,
                  { backgroundColor: i <= localStep ? '#5a9e8e' : '#444' },
                ]}
              />

              {/* text */}
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{s.label}</Text>
                <Text style={styles.stepSub}>{s.sub}</Text>
              </View>

              {/* check */}
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  loader: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(90,158,142,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  loaderRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(90,158,142,0.1)',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5a9e8e',
  },

  title: {
    color: '#ffffffaa',
    fontSize: 14,
    marginBottom: 25,
    textAlign: 'center',
  },

  steps: {
    width: '100%',
    gap: 10,
  },

  step: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },

  activeStep: {
    backgroundColor: 'rgba(255,255,255,0.06)',
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
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  stepSub: {
    color: '#888',
    fontSize: 10,
    marginTop: 2,
  },

  check: {
    color: '#5a9e8e',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
