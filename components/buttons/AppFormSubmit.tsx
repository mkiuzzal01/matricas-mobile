import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";

interface Props<T extends FieldValues = FieldValues> {
  title: string;
  isLoading?: boolean;
  __submit?: SubmitHandler<T>;
}

export default function AppFormSubmit<T extends FieldValues = FieldValues>({
  title,
  isLoading,
  __submit,
}: Props<T>) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<T>();

  return (
    <Pressable
      onPress={
        isSubmitting || isLoading
          ? undefined
          : handleSubmit(__submit ?? (() => {}))
      }
      disabled={isSubmitting || isLoading}
      style={({ pressed }) => [
        styles.button,
        pressed && !isSubmitting && styles.pressed,
        (isSubmitting || isLoading) && styles.disabled,
      ]}
    >
      {isSubmitting ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4f46e5",
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.6,
  },
});
