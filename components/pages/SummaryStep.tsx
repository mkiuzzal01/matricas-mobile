import { Colors } from '@/theme/colors';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../cards/Card';
import AppLayout from '../layouts/AppLayout';
import { useAppDispatch } from '@/redux/hooks';
import { nextStep } from '@/redux/features/surveySlice';

export default function SummaryStep() {
  const theme = Colors.dark;
  const dispatch = useAppDispatch();

  // dummy data
  const data = {
    city: 'Marienplatz 1, München',
    marktwert: 785000,
    span: [720000, 850000],
    confidence: 94,
    qm_preis: 9812,
    trend_1j: 4.2,
    trend_5j: 38.7,
    prognose_1j: 3.8,
    lage_score: 96,
    lage_sub: {
      mikrolage: 97,
      makrolage: 95,
      infrastruktur: 98,
      sozial: 94,
    },
    miete_kalt: 22.4,
    rendite_brutto: 3.42,
    mietmultiplikator: 29.2,
    vermarktung_tage: 14,
    zimmer: 3,
    wohnflaeche: 80,
    etage: '2nd floor',
    baujahr: 1952,
  };

  const actionButtons = ['Download PDF', 'Start Evaluation'];

  return (
    <AppLayout>
      {/* MAIN CONTENT */}
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.city}>{data.city}</Text>

          <Text style={styles.price}>€ {data.marktwert.toLocaleString()}</Text>

          <Text style={styles.range}>
            Range: € {data.span[0].toLocaleString()} - €
            {data.span[1].toLocaleString()}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Confidence {data.confidence}%</Text>
          </View>
        </View>

        {/* KPIs */}
        <Text style={styles.sectionTitle}>Key Metrics</Text>

        <View style={styles.grid}>
          <Card label="€/m²" value={data.qm_preis} />
          <Card label="Trend 1Y" value={`+${data.trend_1j}%`} accent />
          <Card label="Trend 5Y" value={`+${data.trend_5j}%`} accent />
          <Card label="Forecast" value={`+${data.prognose_1j}%`} accent />
        </View>

        {/* LOCATION SCORE */}
        <Text style={styles.sectionTitle}>Location Score</Text>

        <View style={styles.cardLarge}>
          <Text style={styles.score}>{data.lage_score}</Text>
          <Text style={styles.subText}>Micro · Macro · Infra · Social</Text>
        </View>

        <View style={styles.grid}>
          <Card label="Micro" value={data.lage_sub.mikrolage} />
          <Card label="Macro" value={data.lage_sub.makrolage} />
          <Card label="Infra" value={data.lage_sub.infrastruktur} />
          <Card label="Social" value={data.lage_sub.sozial} />
        </View>

        {/* MARKET */}
        <Text style={styles.sectionTitle}>Market</Text>

        <View style={styles.grid}>
          <Card label="Rent €/m²" value={data.miete_kalt} />
          <Card label="Yield" value={`${data.rendite_brutto}%`} accent />
          <Card label="Multiplier" value={`${data.mietmultiplikator}x`} />
          <Card label="Days" value={`${data.vermarktung_tage}`} />
        </View>

        {/* PROPERTY */}
        <Text style={styles.sectionTitle}>Property</Text>

        <View style={styles.grid}>
          <Card label="Rooms" value={data.zimmer} />
          <Card label="Size" value={`${data.wohnflaeche} m²`} />
          <Card label="Floor" value={data.etage} />
          <Card label="Year" value={data.baujahr} />
        </View>
      </ScrollView>

      {/* FIXED ACTION BUTTONS */}
      <View style={styles.row}>
        {/* PRIMARY */}
        <TouchableOpacity activeOpacity={0.8} style={styles.primaryBtn}>
          <Text style={styles.primaryText}>{actionButtons[0]}</Text>
        </TouchableOpacity>

        {/* SECONDARY */}
        <TouchableOpacity
          onPress={() => dispatch(nextStep())}
          activeOpacity={0.8}
          style={styles.secondaryBtn}
        >
          <Text style={styles.secondaryText}>{actionButtons[1]}</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    marginBottom: 20,
  },

  city: {
    color: '#9fb0c0',
    fontSize: 12,
    marginBottom: 8,
  },

  price: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '600',
  },

  range: {
    color: '#7f8ea3',
    fontSize: 12,
    marginTop: 6,
  },

  badge: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(90,158,142,0.1)',
  },

  badgeText: {
    color: '#5a9e8e',
    fontSize: 10,
  },

  sectionTitle: {
    color: '#7f8ea3',
    fontSize: 12,
    marginVertical: 10,
    textTransform: 'uppercase',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  cardLarge: {
    backgroundColor: '#0d1520',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  score: {
    fontSize: 48,
    color: '#5a9e8e',
  },

  subText: {
    color: '#7f8ea3',
    fontSize: 11,
    marginTop: 6,
  },

  /* ACTION BUTTONS */
  row: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
  },

  primaryBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    backgroundColor: 'rgba(90,158,142,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryText: {
    color: '#080d12',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  secondaryBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },

  secondaryText: {
    color: '#7f8ea3',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
