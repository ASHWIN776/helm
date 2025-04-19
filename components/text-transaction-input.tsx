import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { theme, sharedStyles } from "@/utils/theme";
import { useRouter } from "expo-router";
import { useTransactionExtraction } from "@/hooks/useTransactionExtraction";
import { useTransactionStore } from "@/store/transactionStore";

export default function TextTransactionInput() {
  const [text, setText] = useState("");
  const router = useRouter();
  const { mutate: extractTransactions, isPending } = useTransactionExtraction();
  const { addBulkTransactions } = useTransactionStore();

  const handleSubmit = () => {
    if (!text.trim()) return;
    extractTransactions(
      { text },
      {
        onSuccess: (data) => {
          if (data.transactions) {
            addBulkTransactions(data.transactions);
            router.replace("/confirm-transactions?type=text");
          } else {
            alert("No transactions found in the text.");
          }
        },
        onError: (error) => {
          console.log("Error:", error);
          alert(
            error.message ||
              "Failed to extract transactions. Please try again.",
          );
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.inputSection}>
        <Text style={styles.label}>Type your transactions</Text>
        <TextInput
          style={[sharedStyles.input, styles.textArea]}
          multiline
          numberOfLines={6}
          value={text}
          onChangeText={setText}
          placeholder="Bought coffee for 100, Received salary 2000..."
          placeholderTextColor={theme.colors.text.secondary}
          editable={!isPending}
        />
      </View>
      <TouchableOpacity
        style={[styles.submitButton, isPending && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isPending}
        activeOpacity={0.8}
      >
        {isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Extract Transactions</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: theme.spacing.lg,
  },
  inputSection: {
    rowGap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text.primary,
    marginLeft: 4,
    marginBottom: 6,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
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
