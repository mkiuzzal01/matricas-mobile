import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInput as RNTextInput,
} from "react-native";

import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
  RegisterOptions,
} from "react-hook-form";

import { Colors } from "@/theme/colors";

/** ---------------- TYPES ---------------- */
type Props<T extends FieldValues> = {
  name: Path<T>;
  length?: number;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  disabled?: boolean;
};

/** ---------------- COMPONENT ---------------- */
export default function OTPInput<T extends FieldValues>({
  name,
  length = 6,
  label,
  rules,
  disabled = false,
}: Props<T>) {
  const { control } = useFormContext<T>();
  const inputsRef = useRef<Array<RNTextInput | null>>([]);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);

  const focus = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value = "", onChange } }) => {
          const otp = value.split("");

          const handleChange = (text: string, index: number) => {
            if (disabled) return;

            const clean = text.replace(/\D/g, "");
            const next = [...otp];

            // 🔥 paste support
            if (clean.length > 1) {
              clean.split("").forEach((char, i) => {
                if (index + i < length) {
                  next[index + i] = char;
                }
              });

              const joined = next.join("").slice(0, length);
              onChange(joined);

              const nextIndex = Math.min(index + clean.length, length - 1);
              focus(nextIndex);
              return;
            }

            // single digit
            next[index] = clean;

            const joined = next.join("").slice(0, length);
            onChange(joined);

            if (clean && index < length - 1) {
              focus(index + 1);
            }
          };

          const handleKeyPress = (
            e: NativeSyntheticEvent<TextInputKeyPressEventData>,
            index: number,
          ) => {
            if (disabled) return;

            if (e.nativeEvent.key === "Backspace") {
              if (!otp[index] && index > 0) {
                focus(index - 1);
              }
            }
          };

          return (
            <View style={styles.row}>
              {Array.from({ length }).map((_, index) => {
                const isFilled = !!otp[index];
                const isFocused = focusedIndex === index;

                return (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputsRef.current[index] = ref;
                    }}
                    value={otp[index] || ""}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    keyboardType="number-pad"
                    maxLength={1}
                    editable={!disabled}
                    style={[
                      styles.box,
                      isFocused && styles.focusedBox,
                      isFilled && styles.filledBox,
                      disabled && styles.disabledBox,
                    ]}
                    textContentType="oneTimeCode"
                    autoComplete="one-time-code"
                    importantForAutofill="yes"
                  />
                );
              })}
            </View>
          );
        }}
      />
    </View>
  );
}

/** ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    marginBottom: 10,
    color: Colors.dark.mutedForeground,
    fontWeight: "500",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  box: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: Colors.dark.foreground,
    backgroundColor: Colors.dark.background,
  },

  focusedBox: {
    borderColor: "#4f46e5",
    borderWidth: 2,
  },

  filledBox: {
    borderColor: "#6366f1",
  },

  disabledBox: {
    opacity: 0.5,
  },
});
