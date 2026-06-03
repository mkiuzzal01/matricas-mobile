import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
  RegisterOptions,
} from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/theme/colors";

/** ---------------- TYPES ---------------- */
type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<T, Path<T>>;
  maxDate?: Date; // prevent future DOB
  minDate?: Date; // optional restriction
};

/** ---------------- COMPONENT ---------------- */
export default function DateInput<T extends FieldValues>({
  name,
  label = "Date of Birth",
  placeholder = "Select your date of birth",
  rules,
  maxDate = new Date(), // default: today (no future DOB)
  minDate,
}: Props<T>) {
  const { control } = useFormContext<T>();

  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      {/* LABEL */}
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange } }) => {
          const selectedDate = value ? new Date(value) : null;

          return (
            <>
              {/* TRIGGER */}
              <Pressable onPress={() => setOpen(true)} style={styles.input}>
                <View style={styles.row}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={Colors.dark.mutedForeground}
                  />

                  <Text
                    style={[styles.text, !selectedDate && styles.placeholder]}
                  >
                    {selectedDate ? formatDate(selectedDate) : placeholder}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={Colors.dark.mutedForeground}
                />
              </Pressable>

              {/* MODAL */}
              <Modal visible={open} transparent animationType="slide">
                <View style={styles.overlay}>
                  <View style={styles.sheet}>
                    {/* HEADER */}
                    <View style={styles.header}>
                      <Pressable onPress={() => setOpen(false)}>
                        <Text style={styles.cancel}>Cancel</Text>
                      </Pressable>

                      <Pressable
                        onPress={() => {
                          onChange(tempDate);
                          setOpen(false);
                        }}
                      >
                        <Text style={styles.done}>Done</Text>
                      </Pressable>
                    </View>

                    {/* PICKER */}
                    <DateTimePicker
                      value={selectedDate || tempDate}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "calendar"}
                      maximumDate={maxDate}
                      minimumDate={minDate}
                      onChange={(_, date) => {
                        if (date) setTempDate(date);
                      }}
                      style={{ backgroundColor: Colors.dark.card }}
                    />
                  </View>
                </View>
              </Modal>
            </>
          );
        }}
      />
    </View>
  );
}

/** ---------------- STYLES ---------------- */
const PRIMARY = "#4f46e5";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: Colors.dark.mutedForeground,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  text: {
    color: Colors.dark.foreground,
    fontSize: 14,
  },

  placeholder: {
    color: Colors.dark.mutedForeground,
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  sheet: {
    backgroundColor: Colors.dark.card,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingBottom: 20,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },

  cancel: {
    color: "#ff6b6b",
    fontSize: 14,
    fontWeight: "500",
  },

  done: {
    color: PRIMARY,
    fontSize: 14,
    fontWeight: "600",
  },
});
