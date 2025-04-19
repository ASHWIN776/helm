import { theme } from "@/utils/theme";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useStatementUpload } from "@/hooks/useStatementUpload";
import { useTransactionStore } from "@/store/transactionStore";

export default function StatementForm() {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerResult | null>(null);
  const router = useRouter();
  const { mutate: uploadStatement, isPending } = useStatementUpload();
  const { addBulkTransactions } = useTransactionStore();

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/csv",
        copyToCacheDirectory: true,
      });

      if (!result.assets) {
        return;
      }

      if (result.assets[0].uri) {
        setSelectedFile(result);
      }
    } catch (err) {
      console.error("Error picking file:", err);
      alert("Error selecting file. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !selectedFile.assets || !selectedFile.assets[0].uri) {
      console.log("Please select a CSV file first");
      return;
    }

    uploadStatement(
      { fileUri: selectedFile.assets[0].uri },
      {
        onSuccess: (data) => {
          if (data.transactions) {
            addBulkTransactions(data.transactions);
            router.replace("/confirm-name");
          } else {
            console.log("No transactions found in the statement");
          }
        },
        onError: (error) => {
          console.log(error.message);
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ gap: 24 }} style={{ flex: 1 }}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Bank Statement (CSV)</Text>
          <TouchableOpacity
            style={[
              styles.uploadButton,
              selectedFile && styles.uploadButtonWithFile,
            ]}
            onPress={handleFilePick}
            activeOpacity={0.8}
          >
            <View style={styles.uploadPlaceholder}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={40}
                color={theme.colors.text.secondary}
              />
              <Text style={styles.uploadButtonText}>
                {selectedFile?.assets?.[0]?.name ?? "Tap to Upload CSV"}
              </Text>
            </View>
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
          <Text style={styles.submitButtonText}>Process Statement</Text>
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
  uploadButtonWithFile: {
    borderStyle: "solid",
    backgroundColor: theme.colors.primary + "20",
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
