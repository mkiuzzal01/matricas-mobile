import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { Colors } from '@/theme/colors';
import { useAppDispatch } from '@/redux/hooks';
import { nextStep } from '@/redux/features/surveySlice';

const initial = {
  label: 'Data-driven real estate intelligence',
  heading1: 'Property Valuation.',
  heading2: 'In seconds.',
  subHeading: 'Not weeks.',
  description:
    'Professional AVM valuation with 20+ data points. Aggregated from 4 independent data sources. For buyers, owners and professionals.',
  startBtn: 'Start Valuation',
  demoBtn: 'Live Demo',
};

export default function InitialStep() {
  const theme = Colors.dark;
  const dispatch = useAppDispatch();

  return (
    <AppLayout>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ fontSize: 14, color: theme.mutedForeground }}>
          {initial.label}
        </Text>

        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.foreground,
          }}
        >
          {initial.heading1}
        </Text>

        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.foreground,
          }}
        >
          {initial.heading2}
        </Text>

        <Text
          style={{
            fontSize: 18,
            marginTop: 5,
            color: theme.mutedForeground,
          }}
        >
          {initial.subHeading}
        </Text>

        <Text
          style={{
            marginTop: 15,
            fontSize: 14,
            lineHeight: 20,
            color: theme.foreground,
            opacity: 0.8,
          }}
        >
          {initial.description}
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 25, gap: 10 }}>
          <TouchableOpacity
            onPress={() => dispatch(nextStep())}
            style={{
              backgroundColor: theme.primary,
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: theme.primaryForeground }}>
              {initial.startBtn}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(nextStep())}
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              padding: 12,
              borderRadius: 8,
              backgroundColor: theme.card,
            }}
          >
            <Text style={{ color: theme.foreground }}>{initial.demoBtn}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
}
