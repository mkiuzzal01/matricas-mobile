import { Colors } from "@/theme/colors";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../cards/Card";
import AppLayout from "../layouts/AppLayout";
import { router } from "expo-router";
import { useAppSelector } from "@/redux/hooks/appHook";
import { useValuationByIdQuery } from "@/redux/features/valuation/valuation.api";
import LoadingView from "../shared/LoadingView";
import ErrorView from "../shared/EmptyView";

interface SummaryStepProps {
  reportId: number;
}

export default function SummaryStep({ reportId }: SummaryStepProps) {
  const theme = Colors.dark;
  const { data, isLoading, isError } = useValuationByIdQuery(reportId);
  const lang = useAppSelector((state) => state.root.language.lang);
  const searchCity = useAppSelector((state) => state.root.survey.searchCity);

  const t = {
    en: {
      keyMetrics: "Key Metrics",
      locationScore: "Location Score",
      market: "Market",
      property: "Property",
      range: "Range",
      confidence: "Confidence",
      downloadPdf: "Download PDF",
      startEvaluation: "Start Again Evaluation",
      metrics: {
        trend1y: "Trend 1Y",
        trend5y: "Trend 5Y",
        forecast: "Forecast",
        micro: "Micro",
        macro: "Macro",
        infra: "Infra",
        social: "Social",
        rent: "Rent €/m²",
        yield: "Yield",
        multiplier: "Multiplier",
        days: "Days",
        rooms: "Rooms",
        size: "Size",
        floor: "Floor",
        year: "Year",
      },
    },
    de: {
      keyMetrics: "Hauptkennzahlen",
      locationScore: "Lage-Bewertung",
      market: "Markt",
      property: "Immobilie",
      range: "Spanne",
      confidence: "Konfidenz",
      downloadPdf: "PDF herunterladen",
      startEvaluation: "Neue Bewertung",
      metrics: {
        trend1y: "Trend 1J",
        trend5y: "Trend 5J",
        forecast: "Prognose",
        micro: "Mikrolage",
        macro: "Makrolage",
        infra: "Infrastruktur",
        social: "Sozial",
        rent: "Miete €/m²",
        yield: "Rendite",
        multiplier: "Multiplikator",
        days: "Tage",
        rooms: "Zimmer",
        size: "Fläche",
        floor: "Etage",
        year: "Baujahr",
      },
    },
  }[lang];

  const d = data?.data;

  // -------------------------
  // SAFE HELPERS
  // -------------------------
  const format = (v: any, suffix = "") =>
    v !== undefined && v !== null ? `${v}${suffix}` : "-";

  const formatMoney = (v: any) => (v ? `€ ${Number(v).toLocaleString()}` : "-");

  const displayCity = searchCity || d?.city || "—";

  const handleStartEvaluation = () => {
    router.replace("/search");
  };

  if (isLoading)
    return (
      <AppLayout>
        <LoadingView />
      </AppLayout>
    );
  if (isError || !d)
    return (
      <AppLayout>
        <ErrorView />
      </AppLayout>
    );

  return (
    <AppLayout>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.city}>{displayCity}</Text>

          <Text style={styles.price}>{formatMoney(d.marktwert)}</Text>

          <Text style={styles.range}>
            {t.range}: {formatMoney(d.spanne?.[0])} -{" "}
            {formatMoney(d.spanne?.[1])}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {t.confidence} {format(d.confidence, "%")}
            </Text>
          </View>
        </View>

        {/* KEY METRICS */}
        <Text style={styles.sectionTitle}>{t.keyMetrics}</Text>

        <View style={styles.grid}>
          <Card label="€/m²" value={d.qm_preis ?? "-"} />
          <Card
            label={t.metrics.trend1y}
            value={format(d.trend_1j, "%")}
            accent
          />
          <Card
            label={t.metrics.trend5y}
            value={format(d.trend_5j, "%")}
            accent
          />
          <Card
            label={t.metrics.forecast}
            value={format(d.prognose_1j, "%")}
            accent
          />
        </View>

        {/* LOCATION SCORE */}
        <Text style={styles.sectionTitle}>{t.locationScore}</Text>

        <View style={styles.cardLarge}>
          <Text style={styles.score}>{d.lage_score ?? "-"}</Text>
          <Text style={styles.subText}>Micro · Macro · Infra · Social</Text>
        </View>

        <View style={styles.grid}>
          <Card label={t.metrics.micro} value={d.lage_sub?.mikrolage ?? "-"} />
          <Card label={t.metrics.macro} value={d.lage_sub?.makrolage ?? "-"} />
          <Card
            label={t.metrics.infra}
            value={d.lage_sub?.infrastruktur ?? "-"}
          />
          <Card label={t.metrics.social} value={d.lage_sub?.sozial ?? "-"} />
        </View>

        {/* MARKET */}
        <Text style={styles.sectionTitle}>{t.market}</Text>

        <View style={styles.grid}>
          <Card label={t.metrics.rent} value={format(d.miete_kalt)} />
          <Card
            label={t.metrics.yield}
            value={format(d.rendite_brutto, "%")}
            accent
          />
          <Card
            label={t.metrics.multiplier}
            value={format(d.mietmultiplikator, "x")}
          />
          <Card label={t.metrics.days} value={format(d.vermarktung_tage)} />
        </View>

        {/* PROPERTY */}
        <Text style={styles.sectionTitle}>{t.property}</Text>

        <View style={styles.grid}>
          <Card label={t.metrics.rooms} value={d.zimmer ?? "-"} />
          <Card label={t.metrics.size} value={format(d.wohnflaeche, " m²")} />
          <Card label={t.metrics.floor} value={d.etage || "-"} />
          <Card label={t.metrics.year} value={d.baujahr ?? "-"} />
        </View>
      </ScrollView>

      {/* ACTIONS */}
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.8} style={styles.primaryBtn}>
          <Text style={styles.primaryText}>{t.downloadPdf}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleStartEvaluation}
          activeOpacity={0.8}
          style={styles.secondaryBtn}
        >
          <Text style={styles.secondaryText}>{t.startEvaluation}</Text>
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
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
    marginBottom: 20,
  },

  city: {
    color: "#9fb0c0",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },

  price: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "600",
  },

  range: {
    color: "#7f8ea3",
    fontSize: 12,
    marginTop: 6,
  },

  badge: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "rgba(90,158,142,0.1)",
  },

  badgeText: {
    color: "#5a9e8e",
    fontSize: 10,
  },

  sectionTitle: {
    color: "#7f8ea3",
    fontSize: 12,
    marginVertical: 10,
    textTransform: "uppercase",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  cardLarge: {
    backgroundColor: "#0d1520",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  score: {
    fontSize: 48,
    color: "#5a9e8e",
  },

  subText: {
    color: "#7f8ea3",
    fontSize: 11,
    marginTop: 6,
  },

  /* ACTION BUTTONS */
  row: {
    flexDirection: "row",
    gap: 10,
    padding: 12,
  },

  primaryBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    backgroundColor: "rgba(90,158,142,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    color: "#080d12",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  secondaryBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },

  secondaryText: {
    color: "#7f8ea3",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
