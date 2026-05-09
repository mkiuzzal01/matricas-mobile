import { useAppDispatch } from '@/redux/hooks';
import { Colors } from '@/theme/colors';
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import AppLayout from '../layouts/AppLayout';
import { nextStep } from '@/redux/features/surveySlice';

export default function SearchStep() {
  const theme = Colors.dark;
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');

  const suggestions = [
    { id: '1', label: 'Dhaka' },
    { id: '2', label: 'Chattogram' },
    { id: '3', label: 'Sylhet' },
    { id: '4', label: 'Rajshahi' },
    { id: '5', label: 'Khulna' },
  ];

  // ✅ FILTER LOGIC (autocomplete)
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
        <Text style={styles.title}>Search Location</Text>

        {/* INPUT */}
        <View style={styles.inputWrapper}>
          <TextInput
            value={query}
            placeholder="Search address..."
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
                onPress={() => dispatch(nextStep())}
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
          <Text style={styles.examplesLabel}>Examples:</Text>

          {suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => dispatch(nextStep())}
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
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    color: '#5a9e8e',
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 20,
  },

  inputWrapper: {
    backgroundColor: '#1a2937',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
  },

  input: {
    color: '#fff',
    paddingVertical: 14,
    fontSize: 15,
  },

  suggestionList: {
    marginTop: 15,
  },

  suggestionItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5a9e8e',
    marginRight: 10,
  },

  suggestionText: {
    color: '#fff',
    fontSize: 13,
  },

  examplesWrapper: {
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  examplesLabel: {
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#30455a',
    marginRight: 6,
  },

  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 6,
    marginBottom: 6,
  },

  chipText: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#30455a',
  },
});
