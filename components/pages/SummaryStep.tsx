import { Colors } from '@/theme/colors';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../cards/Card';
import AppLayout from '../layouts/AppLayout';
import { router } from 'expo-router';
import { useAppSelector } from '@/redux/hooks';

// Dummy data for property valuation
const dummyData = {
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
  etage: {
    en: '2nd floor',
    de: '2. Obergeschoss',
  },
  baujahr: 1952,
};

const translations = {
  en: {
    keyMetrics: 'Key Metrics',
    locationScore: 'Location Score',
    market: 'Market',
    property: 'Property',
    range: 'Range',
    confidence: 'Confidence',
    downloadPdf: 'Download PDF',
    startEvaluation: 'Start Evaluation',
    metrics: {
      trend1y: 'Trend 1Y',
      trend5y: 'Trend 5Y',
      forecast: 'Forecast',
      micro: 'Micro',
      macro: 'Macro',
      infra: 'Infra',
      social: 'Social',
      rent: 'Rent €/m²',
      yield: 'Yield',
      multiplier: 'Multiplier',
      days: 'Days',
      rooms: 'Rooms',
      size: 'Size',
      floor: 'Floor',
      year: 'Year',
    },
  },
  de: {
    keyMetrics: 'Hauptkennzahlen',
    locationScore: 'Lage-Bewertung',
    market: 'Markt',
    property: 'Immobilie',
    range: 'Spanne',
    confidence: 'Konfidenz',
    downloadPdf: 'PDF herunterladen',
    startEvaluation: 'Neue Bewertung',
    metrics: {
      trend1y: 'Trend 1J',
      trend5y: 'Trend 5J',
      forecast: 'Prognose',
      micro: 'Mikrolage',
      macro: 'Makrolage',
      infra: 'Infrastruktur',
      social: 'Sozial',
      rent: 'Miete €/m²',
      yield: 'Rendite',
      multiplier: 'Multiplikator',
      days: 'Tage',
      rooms: 'Zimmer',
      size: 'Fläche',
      floor: 'Etage',
      year: 'Baujahr',
    },
  },
};

export default function SummaryStep() {
  const theme = Colors.dark;
  const lang = useAppSelector((state) => state.language.lang);
  const searchCity = useAppSelector((state) => state.survey.searchCity);
  const text = translations[lang];

  const displayCity = searchCity ? `${searchCity}` : 'Marienplatz 1, München';

  const handleStartEvaluation = () => {
    router.push('/search');
  };

  return (
    <AppLayout>
      {/* MAIN CONTENT */}
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.city}>{displayCity}</Text>

          <Text style={styles.price}>€ {dummyData.marktwert.toLocaleString()}</Text>

          <Text style={styles.range}>
            {text.range}: € {dummyData.span[0].toLocaleString()} - €
            {dummyData.span[1].toLocaleString()}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {text.confidence} {dummyData.confidence}%
            </Text>
          </View>
        </View>

        {/* KPIs */}
        <Text style={styles.sectionTitle}>{text.keyMetrics}</Text>

        <View style={styles.grid}>
          <Card label="€/m²" value={dummyData.qm_preis} />
          <Card label={text.metrics.trend1y} value={`+${dummyData.trend_1j}%`} accent />
          <Card label={text.metrics.trend5y} value={`+${dummyData.trend_5j}%`} accent />
          <Card label={text.metrics.forecast} value={`+${dummyData.prognose_1j}%`} accent />
        </View>

        {/* LOCATION SCORE */}
        <Text style={styles.sectionTitle}>{text.locationScore}</Text>

        <View style={styles.cardLarge}>
          <Text style={styles.score}>{dummyData.lage_score}</Text>
          <Text style={styles.subText}>Micro · Macro · Infra · Social</Text>
        </View>

        <View style={styles.grid}>
          <Card label={text.metrics.micro} value={dummyData.lage_sub.mikrolage} />
          <Card label={text.metrics.macro} value={dummyData.lage_sub.makrolage} />
          <Card label={text.metrics.infra} value={dummyData.lage_sub.infrastruktur} />
          <Card label={text.metrics.social} value={dummyData.lage_sub.sozial} />
        </View>

        {/* MARKET */}
        <Text style={styles.sectionTitle}>{text.market}</Text>

        <View style={styles.grid}>
          <Card label={text.metrics.rent} value={dummyData.miete_kalt} />
          <Card label={text.metrics.yield} value={`${dummyData.rendite_brutto}%`} accent />
          <Card label={text.metrics.multiplier} value={`${dummyData.mietmultiplikator}x`} />
          <Card label={text.metrics.days} value={`${dummyData.vermarktung_tage}`} />
        </View>

        {/* PROPERTY */}
        <Text style={styles.sectionTitle}>{text.property}</Text>

        <View style={styles.grid}>
          <Card label={text.metrics.rooms} value={dummyData.zimmer} />
          <Card label={text.metrics.size} value={`${dummyData.wohnflaeche} m²`} />
          <Card label={text.metrics.floor} value={lang === 'de' ? dummyData.etage.de : dummyData.etage.en} />
          <Card label={text.metrics.year} value={dummyData.baujahr} />
        </View>
      </ScrollView>

      {/* FIXED ACTION BUTTONS */}
      <View style={styles.row}>
        {/* PRIMARY */}
        <TouchableOpacity activeOpacity={0.8} style={styles.primaryBtn}>
          <Text style={styles.primaryText}>{text.downloadPdf}</Text>
        </TouchableOpacity>

        {/* SECONDARY */}
        <TouchableOpacity
          onPress={handleStartEvaluation}
          activeOpacity={0.8}
          style={styles.secondaryBtn}
        >
          <Text style={styles.secondaryText}>{text.startEvaluation}</Text>
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
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
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
