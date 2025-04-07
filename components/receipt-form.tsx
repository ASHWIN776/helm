import { theme } from "@/utils/theme";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useReceiptExtraction } from "@/hooks/useReceiptExtraction";
import { useNavigation, useRouter } from "expo-router";
import { useTransactionStore } from "@/store/transactionStore";

export default function ReceiptForm() {
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const { mutate: extractReceipt, isPending } = useReceiptExtraction();
  const navigation = useNavigation();
  const router = useRouter();
  const { addBulkTransactions } = useTransactionStore();

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert(
        "Permission to access camera roll is required! Go to settings > Privacy > Camera and enable it.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: false,
      aspect: [16, 9],
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      console.log("Please select a receipt image first");
      return;
    }

    extractReceipt(
      { imageUri: selectedImage.uri },
      {
        onSuccess: (data) => {
          if (data.transactions) {
            console.log("Extracted Transactions:", data.transactions);
            addBulkTransactions(data.transactions);
            router.replace("/confirm-transactions?type=receipt");
          } else {
            console.log("No transactions found in the receipt");
          }
        },
        onError: (error) => {
          console.log(error.message);
        },
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Receipt",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ gap: 24 }} style={{ flex: 1 }}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Image</Text>
          <TouchableOpacity
            style={[
              styles.uploadButton,
              selectedImage && styles.uploadButtonWithImage,
            ]}
            onPress={handleImagePick}
            activeOpacity={0.8}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.previewImage}
              />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={40}
                  color={theme.colors.text.secondary}
                />
                <Text style={styles.uploadButtonText}>
                  Tap to Upload Receipt
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.submitButton, isPending && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Extract</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: theme.spacing.lg,
  },
  formSection: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text.primary,
    marginLeft: 4,
  },
  uploadButton: {
    borderRadius: theme.borderRadius.md,
    width: "100%",
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: theme.colors.input.border,
    borderStyle: "dashed",
    backgroundColor: "#efefef60",
  },
  uploadButtonWithImage: {
    borderStyle: "solid",
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  uploadPlaceholder: {
    alignItems: "center",
    gap: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    fontWeight: "500",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: theme.borderRadius.md,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
