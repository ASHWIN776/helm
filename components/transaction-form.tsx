import { theme, sharedStyles } from "@/utils/theme";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { UnsavedTransaction } from "@/utils/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCreateTransactions } from "@/hooks/useCreateTransactions";
import { useQueryClient } from "@tanstack/react-query";

export default function TransactionForm() {
  const [transaction, setTransaction] = useState<UnsavedTransaction>({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    description: "",
    type: "expense",
  });
  const router = useRouter();
  const navigation = useNavigation();
  const { mutate: createTransaction, isPending } = useCreateTransactions();
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    if (!transaction.date || !transaction.amount || !transaction.description) {
      alert("Please fill in all fields");
      return;
    }

    createTransaction([transaction], {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["transactions"],
        });
        queryClient.invalidateQueries({
          queryKey: ["dashboardData"],
        });
        router.replace("/transactions");
      },
      onError: (error) => {
        console.error("Error adding transaction:", error);
        alert("Error adding transaction. Please try again.");
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      title: "New Transaction",
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={{ gap: 24 }} style={{ flex: 1 }}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Date</Text>
          <DateTimePicker
            value={new Date(transaction.date || new Date())}
            mode="date"
            onChange={(_, selectedDate: Date | undefined) => {
              if (selectedDate) {
                setTransaction((prev) => ({
                  ...prev,
                  date: selectedDate.toISOString().split("T")[0],
                }));
              }
            }}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={[sharedStyles.input, styles.textInput]}
            keyboardType="numeric"
            value={transaction.amount?.toString()}
            onChangeText={(text) =>
              setTransaction((prev) => ({
                ...prev,
                amount: parseFloat(text) || 0,
              }))
            }
            placeholder="Enter amount"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[sharedStyles.input, styles.textInput, styles.textArea]}
            multiline
            numberOfLines={4}
            value={transaction.description}
            onChangeText={(text) =>
              setTransaction((prev) => ({
                ...prev,
                description: text,
              }))
            }
            placeholder="Enter description"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transaction.type === "expense" && styles.typeButtonActive,
              ]}
              onPress={() =>
                setTransaction((prev) => ({ ...prev, type: "expense" }))
              }
            >
              <Text
                style={[
                  styles.typeButtonText,
                  transaction.type === "expense" && styles.typeButtonTextActive,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transaction.type === "income" && styles.typeButtonActive,
              ]}
              onPress={() =>
                setTransaction((prev) => ({ ...prev, type: "income" }))
              }
            >
              <Text
                style={[
                  styles.typeButtonText,
                  transaction.type === "income" && styles.typeButtonTextActive,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>
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
          <Text style={styles.submitButtonText}>Add Transaction</Text>
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
  formSection: {
    rowGap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text.primary,
    marginLeft: 4,
  },
  textInput: {
    height: 46,
  },
  textArea: {
    minHeight: 100,
    height: "auto",
    textAlignVertical: "top",
  },
  typeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.input.border,
    alignItems: "center",
  },
  typeButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  typeButtonText: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color: "white",
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
