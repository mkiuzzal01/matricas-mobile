import React, { useMemo, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppLayout from "../layouts/AppLayout";
import SearchBar from "../shared/SearchBar";
import AnalysisStep from "./AnalysisStep";

import { Colors } from "@/theme/colors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/appHook";
import {
  useCreateValuationMutation,
  useListValuationsQuery,
} from "@/redux/features/valuation/valuation.api";
import { toast } from "@/utils/toast";
import { setSearchCity } from "@/redux/slices/surveySlice";

const PRIMARY = "#5a9e8e";

const translations = {
  en: {
    title: "Search Location",
    loading: "Loading locations...",
    noResults: "No results found",
    recent: "Example: ",
  },
  de: {
    title: "Standort suchen",
    loading: "Standorte werden geladen...",
    noResults: "Keine Ergebnisse gefunden",
    recent: "Beispiel: ",
  },
};

export default function SearchStep() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.root.language.lang);
  const [reportId, setReportId] = useState<number | null>(null);
  const { data, isLoading } = useListValuationsQuery();
  const [createValuation, { isLoading: creating, isSuccess, isError }] =
    useCreateValuationMutation();

  const [query, setQuery] = useState("");

  const t = translations[lang];
  const valuations = data?.data ?? [];

  // -------------------------
  // Unique cities
  // -------------------------
  const cities = useMemo(() => {
    const map = new Map();

    valuations.forEach((item: any) => {
      if (!item?.city) return;

      map.set(item.city.toLowerCase(), {
        id: String(item.id),
        city: item.city,
        address: item.address,
      });
    });

    return Array.from(map.values());
  }, [valuations]);

  // -------------------------
  // Filter suggestions
  // -------------------------
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return [];

    return cities
      .filter(
        (i) =>
          i.city.toLowerCase().includes(search) ||
          i.address?.toLowerCase().includes(search),
      )
      .slice(0, 8);
  }, [query, cities]);

  // -------------------------
  // SEARCH FLOW (IMPORTANT)
  // -------------------------
  const handleSearch = useCallback(
    async (value: string) => {
      const v = value.trim();
      if (!v || creating) return;

      dispatch(setSearchCity(v));
      try {
        const res = await createValuation({ address: v }).unwrap();
        setReportId(res?.data?.id);
        console.log(res);
      } catch (err: any) {
        toast.error(err?.data?.message);
      }
    },
    [createValuation, creating],
  );

  if (creating && !reportId && !isSuccess && !isError) {
    return (
      <AppLayout>
        <AnalysisStep
          reportId={reportId}
          isLoading={creating}
          isSuccess={isSuccess}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.title}>{t.title}</Text>

        {/* SEARCH BAR */}
        <SearchBar
          value={query}
          placeholder="Search city or address..."
          onChangeText={setQuery}
          onSearch={handleSearch}
        />

        {/* LOADING */}
        {isLoading && (
          <View style={styles.center}>
            <ActivityIndicator color={PRIMARY} />
            <Text style={styles.mutedText}>{t.loading}</Text>
          </View>
        )}

        {/* SUGGESTIONS */}
        {!isLoading && filtered.length > 0 && (
          <FlatList
            data={filtered}
            keyExtractor={(i) => i.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingTop: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  setQuery(item.city);
                  handleSearch(item.city);
                }}
              >
                <Ionicons name="location-outline" size={16} color={PRIMARY} />

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.city}>{item.city}</Text>
                  {!!item.address && (
                    <Text style={styles.address}>{item.address}</Text>
                  )}
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Colors.dark.mutedForeground}
                />
              </TouchableOpacity>
            )}
          />
        )}

        {/* NO RESULTS */}
        {!isLoading && query.trim() && filtered.length === 0 && (
          <View style={styles.center}>
            <Ionicons
              name="search-outline"
              size={22}
              color={Colors.dark.mutedForeground}
            />
            <Text style={styles.mutedText}>{t.noResults}</Text>
          </View>
        )}

        {/* RECENT */}
        {!query.trim() && cities.length > 0 && (
          <View style={styles.recent}>
            <Text style={styles.recentTitle}>{t.recent}</Text>

            <View style={styles.chips}>
              {cities.slice(0, 10).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.chip}
                  onPress={() => handleSearch(item.city)}
                >
                  <Text style={styles.chipText}>{item.city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    color: PRIMARY,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 18,
    opacity: 0.9,
  },

  // -------------------------
  // CARD
  // -------------------------
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.dark.card,
    borderRadius: 14,

    paddingVertical: 12,
    paddingHorizontal: 14,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: Colors.dark.border,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  city: {
    color: Colors.dark.foreground,
    fontSize: 14,
    fontWeight: "600",
  },

  address: {
    color: Colors.dark.mutedForeground,
    fontSize: 12,
    marginTop: 2,
  },

  // -------------------------
  // CENTER STATE
  // -------------------------
  center: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  mutedText: {
    color: Colors.dark.mutedForeground,
    fontSize: 13,
  },

  // -------------------------
  // RECENT SECTION
  // -------------------------
  recent: {
    marginTop: 28,
  },

  recentTitle: {
    fontSize: 11,
    color: Colors.dark.mutedForeground,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12,
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,

    borderRadius: 999,

    backgroundColor: Colors.dark.card,

    borderWidth: 1,
    borderColor: Colors.dark.border,

    marginRight: 8,
    marginBottom: 8,
  },

  chipText: {
    color: Colors.dark.foreground,
    fontSize: 12,
    fontWeight: "500",
  },
});
