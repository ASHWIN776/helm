import React, { useState } from "react";
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
  transaction: initialTransaction,
  onSave,
  onCancel,
}: InlineTransactionEditFormProps) => {
  const [transaction, setTransaction] =
    useState<Transaction>(initialTransaction);

  return (
    <View style={styles.editContainer}>
      <Text style={styles.editTitle}>Edit Transaction</Text>
      <TextInput
        style={styles.input}
        value={transaction.description}
        onChangeText={(description) =>
          setTransaction({ ...transaction, description })
        }
        placeholder="Description"
      />
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            transaction.type === "expense" && styles.typeButtonExpenseActive,
          ]}
          onPress={() => setTransaction({ ...transaction, type: "expense" })}
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
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            transaction.type === "income" && styles.typeButtonIncomeActive,
          ]}
          onPress={() => setTransaction({ ...transaction, type: "income" })}
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
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={transaction.merchant}
        onChangeText={(merchant) =>
          setTransaction({ ...transaction, merchant })
        }
        placeholder="Merchant"
      />
      <View style={styles.inputRow}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            value={transaction.amount.toString()}
            onChangeText={(amount) =>
              setTransaction({ ...transaction, amount })
            }
            placeholder="Amount"
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            value={transaction.date}
            onChangeText={(date) => setTransaction({ ...transaction, date })}
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
          onPress={() => onSave(transaction)}
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
  typeContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: theme.spacing.sm,
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
    backgroundColor: theme.colors.red + "22", // light red background
    borderColor: theme.colors.red,
  },
  typeButtonIncomeActive: {
    backgroundColor: theme.colors.green + "22", // light green background
    borderColor: theme.colors.green,
  },
  typeButtonExpenseTextActive: {
    color: theme.colors.red,
  },
  typeButtonIncomeTextActive: {
    color: theme.colors.green,
  },
  typeButtonText: {
    color: theme.colors.text.primary,
    fontWeight: "500",
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
