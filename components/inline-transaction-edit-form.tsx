import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { theme } from "@/utils/theme";
import { Transaction } from "@/utils/types";

export interface InlineTransactionEditFormProps {
  transaction: Transaction;
  onSave: (transaction: Transaction) => void;
  onCancel: () => void;
}

export const InlineTransactionEditForm = ({
  transaction,
  onSave,
  onCancel,
}: InlineTransactionEditFormProps) => {
  const [description, setDescription] = React.useState(
    transaction?.description || "",
  );
  const [amount, setAmount] = React.useState(
    transaction?.amount?.toString() || "",
  );
  const [date, setDate] = React.useState(transaction?.date || "");
  const [merchant, setMerchant] = React.useState(transaction?.merchant || "");

  return (
    <View style={styles.editContainer}>
      <Text style={styles.editTitle}>Edit Transaction</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        value={merchant}
        onChangeText={setMerchant}
        placeholder="Merchant"
      />
      <View style={styles.inputRow}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Amount"
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="Date"
          />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() =>
            onSave({ ...transaction, description, amount, merchant, date })
          }
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    backgroundColor: theme.colors.card.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
  editTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: theme.spacing.sm,
    fontSize: 16,
    backgroundColor: theme.colors.white,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: theme.spacing.sm,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.gray,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: theme.colors.text.primary,
    fontWeight: "700",
  },
  saveButtonText: {
    color: theme.colors.white,
    fontWeight: "700",
  },
});
