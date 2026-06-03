import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/theme/colors";

interface AppTextInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  label: string;
  rules?: RegisterOptions<T, Path<T>>;
  leftIcon?: keyof typeof Ionicons.glyphMap;
}

export default function AppTextInput<T extends FieldValues>({
  name,
  label,
  rules,
  leftIcon,
  secureTextEntry,
  style,
  ...inputProps
}: AppTextInputProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const errorMessage = getErrorMessage(errors, name);

  const isPasswordField = !!secureTextEntry;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputWrapper}>
            {leftIcon && (
              <Ionicons
                name={leftIcon}
                size={20}
                color={
                  isFocused
                    ? Colors.dark.foreground
                    : Colors.dark.mutedForeground
                }
                style={styles.leftIcon}
              />
            )}

            <TextInput
              {...inputProps}
              value={value?.toString() ?? ""}
              onChangeText={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              secureTextEntry={isPasswordField ? !showPassword : false}
              placeholderTextColor={Colors.dark.mutedForeground}
              style={[
                styles.input,
                leftIcon && styles.inputWithLeftIcon,
                isFocused && styles.inputFocused,
                !!errorMessage && styles.inputError,
                style,
              ]}
            />

            {isPasswordField && (
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                style={styles.rightIcon}
                hitSlop={10}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={Colors.dark.mutedForeground}
                />
              </Pressable>
            )}
          </View>
        )}
      />

      {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

function getErrorMessage(errors: any, path: string): string | undefined {
  const keys = path.split(".");
  let current = errors;

  for (const key of keys) {
    current = current?.[key];
  }

  return current?.message?.toString();
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.dark.mutedForeground,
    marginBottom: 6,
  },

  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingRight: 44,
    backgroundColor: Colors.dark.background,
    color: Colors.dark.foreground,
    fontSize: 16,
  },

  inputFocused: {
    borderColor: Colors.dark.foreground,
  },

  inputError: {
    borderColor: Colors.dark.destructive,
  },

  leftIcon: {
    position: "absolute",
    left: 12,
    zIndex: 10,
  },

  inputWithLeftIcon: {
    paddingLeft: 42,
  },

  rightIcon: {
    position: "absolute",
    right: 12,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.dark.destructive,
  },
});
