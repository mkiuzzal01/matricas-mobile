import { Colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

/** ---------------- TYPES ---------------- */
type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<T, Path<T>>;
  maxDate?: Date;
  minDate?: Date;
};

/** ---------------- COMPONENT ---------------- */
export default function DateInput<T extends FieldValues>({
  name,
  label = "Date of Birth",
  placeholder = "Select date",
  rules,
  maxDate = new Date(),
  minDate,
}: Props<T>) {
  const { control } = useFormContext<T>();

  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const selectedDate = value ? new Date(value) : null;

          const openPicker = () => {
            setTempDate(selectedDate ?? new Date());
            setOpen(true);
          };

          /** ---------------- HANDLE CHANGE ---------------- */
          const handleChange = (event: any, date?: Date) => {
            // ANDROID BEHAVIOR
            if (Platform.OS === "android") {
              if (event.type === "set" && date) {
                onChange(date);
                setTempDate(date);
              }
              setOpen(false);
              return;
            }

            // IOS BEHAVIOR (does not auto close)
            if (date) setTempDate(date);
          };

          return (
            <>
              {/* INPUT */}
              <Pressable
                onPress={openPicker}
                style={[styles.input, error ? styles.inputError : null]}
              >
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

              {/* ERROR */}
              {error?.message && (
                <Text style={styles.errorText}>{error.message}</Text>
              )}

              {/* MODAL */}
              <Modal
                visible={open}
                transparent
                animationType="slide"
                onRequestClose={() => setOpen(false)}
              >
                <View style={styles.overlay}>
                  <View style={styles.sheet}>
                    {/* HEADER (iOS only useful) */}
                    {Platform.OS === "ios" && (
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
                    )}

                    {/* PICKER */}
                    <DateTimePicker
                      value={tempDate}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "calendar"}
                      maximumDate={maxDate}
                      minimumDate={minDate}
                      onChange={handleChange}
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
const PRIMARY = "#5a9e8e";

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

  inputError: {
    borderColor: "#ef4444",
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

  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#ef4444",
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
