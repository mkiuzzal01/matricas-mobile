import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
  RegisterOptions,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/theme/colors";

/** ---------------- TYPES ---------------- */
type Option = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  rules?: RegisterOptions<T, Path<T>>;
  disabled?: boolean;
};

/** ---------------- COMPONENT ---------------- */
export default function SelectInput<T extends FieldValues>({
  name,
  label,
  placeholder = "Select an option",
  options,
  rules,
  disabled,
}: Props<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const errorMessage = getError(errors, name);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* LABEL */}
        {label && <Text style={styles.label}>{label}</Text>}

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { value, onChange } }) => {
            const selected = options.find((o) => o.value === value);

            const filtered = options.filter((o) =>
              o.label.toLowerCase().includes(search.toLowerCase()),
            );

            return (
              <>
                {/* SELECT */}
                <Pressable
                  disabled={disabled}
                  onPress={() => setVisible(true)}
                  style={[
                    styles.input,
                    disabled && styles.disabled,
                    errorMessage && styles.errorBorder,
                  ]}
                >
                  <Text
                    style={[styles.text, !selected && styles.placeholder]}
                    numberOfLines={1}
                  >
                    {selected?.label || placeholder}
                  </Text>

                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color={Colors.dark.mutedForeground}
                  />
                </Pressable>

                {/* MODAL */}
                <Modal visible={visible} animationType="slide" transparent>
                  <View style={styles.overlay}>
                    <View style={styles.modal}>
                      {/* HEADER */}
                      <View style={styles.header}>
                        <Text style={styles.title}>Select Option</Text>

                        <Pressable onPress={() => setVisible(false)}>
                          <Ionicons
                            name="close"
                            size={22}
                            color={Colors.dark.foreground}
                          />
                        </Pressable>
                      </View>

                      {/* SEARCH */}
                      <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search..."
                        placeholderTextColor={Colors.dark.mutedForeground}
                        style={styles.search}
                      />

                      {/* LIST */}
                      <FlatList
                        data={filtered}
                        keyExtractor={(i) => i.value}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          <Pressable
                            onPress={() => {
                              onChange(item.value);
                              setVisible(false);
                              setSearch("");
                            }}
                            style={styles.item}
                          >
                            <Text style={styles.itemText}>{item.label}</Text>

                            {item.value === value && (
                              <Ionicons
                                name="checkmark"
                                size={18}
                                color="#4f46e5"
                              />
                            )}
                          </Pressable>
                        )}
                      />
                    </View>
                  </View>
                </Modal>
              </>
            );
          }}
        />

        {/* ERROR */}
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
    </View>
  );
}

/** ---------------- ERROR HELPER ---------------- */
function getError(errors: any, name: string) {
  return name.split(".").reduce((acc, key) => acc?.[key], errors)?.message;
}

/** ---------------- STYLES ---------------- */
const SCREEN_WIDTH = Dimensions.get("window").width;

const MAX_WIDTH = 420;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
  },

  container: {
    width: "100%",
    maxWidth: MAX_WIDTH,
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
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    color: Colors.dark.foreground,
    flex: 1,
  },

  placeholder: {
    color: Colors.dark.mutedForeground,
  },

  disabled: {
    opacity: 0.5,
  },

  errorBorder: {
    borderColor: Colors.dark.destructive,
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.dark.destructive,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  modal: {
    width: "100%",
    maxWidth: MAX_WIDTH,
    height: "75%",
    backgroundColor: Colors.dark.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark.foreground,
  },

  search: {
    height: 42,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    color: Colors.dark.foreground,
  },

  item: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },

  itemText: {
    color: Colors.dark.foreground,
  },
});
