import { setSearchCity } from "@/redux/slices/surveySlice";
import { Colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppLayout from "../layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/appHook";

const suggestions = [
  { id: "1", label: "München" },
  { id: "2", label: "Berlin" },
  { id: "3", label: "Hamburg" },
  { id: "4", label: "Frankfurt" },
  { id: "5", label: "Köln" },
];

const translations = {
  en: {
    title: "Search Location",
    placeholder: "Search address...",
    examples: "Examples:",
  },
  de: {
    title: "Standort suchen",
    placeholder: "Adresse suchen...",
    examples: "Beispiele:",
  },
};

export default function SearchStep() {
  const theme = Colors.dark;
  const [query, setQuery] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.root.language.lang);
  const text = translations[lang];

  const handleNavigate = (city: string) => {
    dispatch(setSearchCity(city));
    router.push("/analysis");
  };

  const filteredSuggestions =
    query.trim().length > 0
      ? suggestions.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  return (
    <AppLayout>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* TITLE */}
        <Text style={styles.title}>{text.title}</Text>

        {/* INPUT */}
        <View style={styles.inputWrapper}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={text.placeholder}
            placeholderTextColor="#67829a"
            style={styles.input}
          />
        </View>

        {/* SUGGESTIONS (ONLY WHEN TYPING) */}
        {query.trim().length > 0 && filteredSuggestions.length > 0 && (
          <View style={styles.suggestionList}>
            {filteredSuggestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => handleNavigate(item.label)}
                style={styles.suggestionItem}
              >
                <View style={styles.dot} />
                <Text style={styles.suggestionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* EXAMPLES SECTION */}
        <View style={styles.examplesWrapper}>
          <Text style={styles.examplesLabel}>{text.examples}</Text>

          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleNavigate(item.label)}
              activeOpacity={0.7}
              style={styles.chip}
            >
              <Text style={styles.chipText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "#5a9e8e",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 20,
  },

  inputWrapper: {
    backgroundColor: "#1a2937",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
  },

  input: {
    color: "#fff",
    paddingVertical: 14,
    fontSize: 15,
  },

  suggestionList: {
    marginTop: 15,
  },

  suggestionItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#5a9e8e",
    marginRight: 10,
  },

  suggestionText: {
    color: "#fff",
    fontSize: 13,
  },

  examplesWrapper: {
    marginTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  examplesLabel: {
    fontSize: 10,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#30455a",
    marginRight: 6,
  },

  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginRight: 6,
    marginBottom: 6,
  },

  chipText: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#30455a",
  },
});
