import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTransactionStore } from "@/store/transactionStore";
import { TransactionCard } from "@/components/transaction-card";
import { theme } from "@/utils/theme";
import { router, useLocalSearchParams } from "expo-router";
import { useCreateTransactions } from "@/hooks/useCreateTransactions";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { TransactionSummary } from "@/components/transaction-summary";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";

export default function Confirm() {
  const transactions = useTransactionStore((state) => state.transactions);
  const editTransactionInStore = useTransactionStore(
    (state) => state.editTransaction,
  );
  const queryClient = useQueryClient();
  const clearTransactionStore = useTransactionStore(
    (state) => state.clearStore,
  );
  const { mutate: createTransactions, isPending } = useCreateTransactions();
  const { type } = useLocalSearchParams();
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const [editTransaction, setEditTransaction] = React.useState<any>(null);

  const summaryData = React.useMemo(() => {
    if (type === "statement" || type === "text") {
      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      return { income, expense };
    } else {
      const total = transactions.reduce((sum, t) => sum + t.amount, 0);
      return { total };
    }
  }, [transactions, type]);

  const handleConfirm = () => {
    createTransactions(transactions, {
      onSuccess: () => {
        clearTransactionStore();
        queryClient.invalidateQueries({
          queryKey: ["transactions"],
        });
        router.replace("/transactions");
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    });
  };

  const handleSubmit = () => {
    Alert.alert(
      "Save Transactions?",
      `This will save all ${transactions.length} extracted transactions. Are you sure?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            handleConfirm();
          },
          style: "default",
        },
      ],
    );
  };

  const handleCancel = () => {
    Alert.alert(
      "Clear Transactions?",
      "This will clear all extracted transactions. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            clearTransactionStore();
            router.replace("/");
          },
          style: "destructive",
        },
      ],
    );
  };

  // Save edited transaction
  const handleSaveEdit = () => {
    if (expandedIndex !== null && editTransaction) {
      editTransactionInStore(editTransaction.id, editTransaction);
      setExpandedIndex(null);
      setEditTransaction(null);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setExpandedIndex(null);
    setEditTransaction(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TransactionSummary
        type={type as "statement" | "receipt" | "text"}
        summaryData={summaryData}
      />
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.transactionCount}>
            {transactions.length} Transaction
            {transactions.length !== 1 ? "s" : ""}
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {type === "statement" ? "Statement" : "Receipt"}
            </Text>
          </View>
        </View>
        <FlashList
          data={transactions}
          extraData={expandedIndex}
          renderItem={({ item, index }) => (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                  <TransactionCard transaction={item} />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setExpandedIndex(index);
                    setEditTransaction({ ...item });
                  }}
                  style={{ padding: 8 }}
                  accessibilityLabel="Edit Transaction"
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={22}
                    color={theme.colors.text.secondary}
                  />
                </TouchableOpacity>
              </View>
              {expandedIndex === index ? (
                <View
                  style={{
                    backgroundColor: theme.colors.card.background,
                    padding: theme.spacing.md,
                    borderRadius: theme.borderRadius.md,
                    marginTop: theme.spacing.xs,
                    marginBottom: theme.spacing.sm,
                    borderWidth: 1,
                    borderColor: theme.colors.card.border,
                  }}
                >
                  <Text
                    style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}
                  >
                    Edit Transaction
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: theme.colors.card.border,
                      borderRadius: 8,
                      padding: 8,
                      marginBottom: 8,
                    }}
                    value={editTransaction.description}
                    onChangeText={(text) =>
                      setEditTransaction((prev: any) => ({
                        ...prev,
                        description: text,
                      }))
                    }
                    placeholder="Description"
                  />
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: theme.colors.card.border,
                      borderRadius: 8,
                      padding: 8,
                      marginBottom: 8,
                    }}
                    value={String(editTransaction.amount)}
                    onChangeText={(text) =>
                      setEditTransaction((prev: any) => ({
                        ...prev,
                        amount: Number(text),
                      }))
                    }
                    placeholder="Amount"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: theme.colors.card.border,
                      borderRadius: 8,
                      padding: 8,
                      marginBottom: 8,
                    }}
                    value={editTransaction.date}
                    onChangeText={(text) =>
                      setEditTransaction((prev: any) => ({
                        ...prev,
                        date: text,
                      }))
                    }
                    placeholder="Date"
                  />
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor: theme.colors.gray,
                        padding: 12,
                        borderRadius: 8,
                        alignItems: "center",
                      }}
                      onPress={handleCancelEdit}
                    >
                      <Text
                        style={{
                          color: theme.colors.text.primary,
                          fontWeight: "700",
                        }}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor: theme.colors.primary,
                        padding: 12,
                        borderRadius: 8,
                        alignItems: "center",
                      }}
                      onPress={handleSaveEdit}
                    >
                      <Text
                        style={{ color: theme.colors.white, fontWeight: "700" }}
                      >
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          )}
          estimatedItemSize={100}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            {isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  listContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  separator: {
    height: theme.spacing.sm,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  buttonRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.gray,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  transactionCount: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },
  badge: {
    backgroundColor: theme.colors.gray,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textTransform: "capitalize",
  },
});
