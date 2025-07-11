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
  Alert,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Transaction, UnsavedTransaction } from "@/utils/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCreateTransactions } from "@/hooks/useCreateTransactions";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  transaction?: Transaction | null;
  onSubmit?: (tx: Transaction) => void;
  submitLabel?: string;
  isPending?: boolean;
  showDelete?: boolean;
  onDelete?: () => void;
  isPendingDelete?: boolean;
}

/**
 * TransactionForm component for creating and editing transactions.
 *
 * - If a `transaction` prop is provided, the form is pre-filled for editing.
 * - If no `transaction` is provided, the form is initialized for creating a new transaction.
 * - On submit, calls the `onSubmit` callback (if provided), otherwise creates a new transaction via API.
 * - The submit button shows a loading spinner if `isPending` or `isPendingCreate` is true.
 *
 * @param {Object} props
 * @param {Transaction | null} [props.transaction] - Transaction to edit (if any)
 * @param {(tx: Transaction) => void} [props.onSubmit] - Callback for submit (edit/create)
 * @param {string} [props.submitLabel] - Label for the submit button
 * @param {boolean} [props.isPending] - If true, shows loading spinner on submit button
 * @param {boolean} [props.showDelete] - If true, shows delete button
 * @param {() => void} [props.onDelete] - Callback for delete
 * @param {boolean} [props.isPendingDelete] - If true, shows loading spinner on delete button
 */
export default function TransactionForm({
  transaction: initialTransaction,
  onSubmit,
  submitLabel = "Save",
  isPending = false,
  showDelete = false,
  onDelete,
  isPendingDelete = false,
}: Props) {
  const [transaction, setTransaction] = useState<
    UnsavedTransaction | Transaction
  >(
    initialTransaction || {
      date: new Date().toISOString().split("T")[0],
      amount: "0",
      description: "",
      type: "expense",
      merchant: "",
    },
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const { mutate: createTransaction, isPending: isPendingCreate } =
    useCreateTransactions();
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    if (!transaction.date || !transaction.amount || !transaction.description) {
      Alert.alert("Please fill the required fields");
      return;
    }

    if (onSubmit && (transaction as Transaction).id) {
      onSubmit(transaction as Transaction);
      return;
    }

    // If transaction has an id, it's already saved
    if ((transaction as Transaction).id) {
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
        Alert.alert("Error adding transaction. Please try again.");
      },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
          style: "destructive",
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={showDelete ? 75 : 100}
    >
      <ScrollView contentContainerStyle={{ gap: 24 }} style={{ flex: 1 }}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Date</Text>
          <Pressable
            style={[
              sharedStyles.input,
              styles.textInput,
              { justifyContent: "center" },
            ]}
            onPress={() => setShowDatePicker(true)}
            accessibilityLabel="Select date"
          >
            <Text
              style={{
                color: transaction.date
                  ? theme.colors.text.primary
                  : theme.colors.text.secondary,
              }}
            >
              {transaction.date
                ? new Date(transaction.date).toLocaleDateString()
                : "Select date"}
            </Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={transaction.date ? new Date(transaction.date) : new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setTransaction((prev) => ({
                    ...prev,
                    date: selectedDate.toISOString().split("T")[0],
                  }));
                }
              }}
            />
          )}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={[sharedStyles.input, styles.textInput]}
            keyboardType="decimal-pad"
            value={transaction.amount}
            onChangeText={(text) =>
              setTransaction((prev) => ({
                ...prev,
                amount: text,
              }))
            }
            placeholder="Enter amount"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Shop</Text>
          <TextInput
            style={[sharedStyles.input, styles.textInput]}
            value={transaction.merchant}
            onChangeText={(text) =>
              setTransaction((prev) => ({
                ...prev,
                merchant: text,
              }))
            }
            placeholder="Enter shop name"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Commodity</Text>
          <TextInput
            style={[sharedStyles.input, styles.textInput]}
            value={transaction.description}
            onChangeText={(text) =>
              setTransaction((prev) => ({
                ...prev,
                description: text,
              }))
            }
            placeholder="Enter name of the commodity"
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.typeContainer}>
            <Pressable
              style={[
                styles.typeButton,
                transaction.type === "expense" &&
                  styles.typeButtonExpenseActive,
              ]}
              onPress={() =>
                setTransaction((prev) => ({ ...prev, type: "expense" }))
              }
            >
              <Text
                style={[
                  styles.typeButtonText,
                  transaction.type === "expense" &&
                    styles.typeButtonExpenseTextActive,
                ]}
              >
                Expense
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.typeButton,
                transaction.type === "income" && styles.typeButtonIncomeActive,
              ]}
              onPress={() =>
                setTransaction((prev) => ({ ...prev, type: "income" }))
              }
            >
              <Text
                style={[
                  styles.typeButtonText,
                  transaction.type === "income" &&
                    styles.typeButtonIncomeTextActive,
                ]}
              >
                Income
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonRow}>
        {showDelete ? (
          <TouchableOpacity
            style={[
              styles.deleteButton,
              isPendingDelete && styles.deleteButtonDisabled,
            ]}
            onPress={handleDelete}
            disabled={isPendingDelete}
            activeOpacity={0.7}
          >
            {isPendingDelete ? (
              <ActivityIndicator color={theme.colors.red} />
            ) : (
              <Text style={styles.deleteButtonText}>Delete</Text>
            )}
          </TouchableOpacity>
        ) : undefined}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (isPending || isPendingCreate) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isPending || isPendingCreate}
          activeOpacity={0.7}
        >
          {isPending || isPendingCreate ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>{submitLabel}</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: theme.spacing.md,
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
  typeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.input.border,
    alignItems: "center",
  },
  typeButtonExpenseActive: {
    backgroundColor: theme.colors.red + "22",
    borderColor: theme.colors.red,
  },
  typeButtonIncomeActive: {
    backgroundColor: theme.colors.green + "22",
    borderColor: theme.colors.green,
  },
  typeButtonExpenseTextActive: {
    color: theme.colors.red,
  },
  typeButtonIncomeTextActive: {
    color: theme.colors.green,
  },
  typeButtonText: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: theme.colors.red,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButtonDisabled: {
    opacity: 0.7,
  },
  deleteButtonText: {
    color: theme.colors.red,
    fontSize: 16,
    fontWeight: "700",
  },
  buttonRow: {
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
});
