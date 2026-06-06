import React, { useCallback } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme/colors";

interface FileUploaderProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  rules?: RegisterOptions<T>;
}

export default function FileUploader<T extends FieldValues>({
  name,
  label,
  rules,
}: FileUploaderProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = (errors as any)?.[name]?.message;

  // ✅ Request permission only when needed
  const requestPermission = useCallback(async () => {
    const permission = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      const req = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return req.status === "granted";
    }

    return true;
  }, []);

  const pickImage = useCallback(
    async (onChange: (value: any) => void) => {
      try {
        const granted = await requestPermission();
        if (!granted) return;

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        });

        if (result.canceled) return;

        const asset = result.assets[0];

        // Fetch the image data and create a File object compatible with FormData
        let fileObj: any;
        try {
          const response = await fetch(asset.uri);
          const blob = await response.blob();
          const fileName = asset.fileName ?? "photo.jpg";
          const mimeType = asset.mimeType ?? "image/jpeg";
          fileObj = new File([blob], fileName, { type: mimeType });
        } catch (e) {
          // Fallback to simple object if fetch fails (e.g., on native platforms)
          console.log("Fallback file creation", e);
          fileObj = {
            uri: asset.uri,
            name: asset.fileName ?? "photo.jpg",
            type: asset.mimeType ?? "image/jpeg",
          } as any;
        }

        onChange(fileObj);
      } catch (err) {
        console.log("Image pick error:", err);
      }
    },
    [requestPermission],
  );

  const renderPlaceholder = () => (
    <View style={styles.placeholder}>
      <View style={styles.iconWrapper}>
        <Ionicons name="cloud-upload-outline" size={26} color="#5a9e8e" />
      </View>

      <Text style={styles.uploadTitle}>Upload File</Text>
      <Text style={styles.uploadSubtitle}>Tap to browse your images</Text>
    </View>
  );

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>

          <Pressable
            style={styles.uploadBox}
            onPress={() => pickImage(onChange)}
          >
            {value?.uri ? (
              <View style={styles.previewWrapper}>
                <Image source={{ uri: value.uri }} style={styles.image} />

                {/* remove button */}
                <Pressable
                  style={styles.removeBtn}
                  onPress={() => onChange(undefined)}
                >
                  <Ionicons name="close" size={16} color="#fff" />
                </Pressable>
              </View>
            ) : (
              renderPlaceholder()
            )}
          </Pressable>

          {!!error && <Text style={styles.error}>{String(error)}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.dark.mutedForeground,
    marginBottom: 8,
  },

  uploadBox: {
    minHeight: 220,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.dark.background,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(90,158,142,0.1)",
    borderWidth: 1,
    borderColor: "rgba(90,158,142,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  uploadTitle: {
    color: Colors.dark.foreground,
    fontSize: 14,
    fontWeight: "600",
  },

  uploadSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.dark.mutedForeground,
  },

  previewWrapper: {
    width: "100%",
    height: 220,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  removeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.dark.destructive,
  },
});
