import React, { memo, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme/colors";

type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onSearch: (value: string) => void;
};

const PRIMARY = "#5a9e8e";

function SearchBar({
  value,
  placeholder = "Search...",
  onChangeText,
  onSearch,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = !value.trim();

  const handleSearch = () => {
    const v = value.trim();
    if (!v) return;
    onSearch(v);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.dark.mutedForeground}
        style={[styles.input, isFocused && styles.focused]}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        disabled={isDisabled}
        onPress={handleSearch}
        style={[styles.searchButton, isDisabled && styles.searchButtonDisabled]}
      >
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    color: Colors.dark.foreground,
    fontSize: 15,
    fontWeight: "500",
    height: 44,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 14,
    paddingHorizontal: 14,
  },

  focused: {
    borderColor: PRIMARY,
  },

  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },

  searchButtonDisabled: {
    opacity: 0.4,
  },
});
