import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTransactionStore } from "@/store/transactionStore";
import { TransactionCard } from "@/components/transaction-card";
import { theme } from "@/utils/theme";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCreateTransactions } from "@/hooks/useCreateTransactions";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { TransactionSummary } from "@/components/transaction-summary";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InlineTransactionEditForm } from "@/components/inline-transaction-edit-form";
import { Transaction } from "@/utils/types";

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
  const navigation = useNavigation();

  const summaryData = React.useMemo(() => {
    if (type === "statement" || type === "text") {
      const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      return { income, expense };
    } else {
      const total = transactions.reduce(
        (sum, t) => sum + parseFloat(t.amount),
        0,
      );
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
    const transactionsCount = transactions.length;
    const descriptionBody =
      transactionsCount > 1
        ? `This will save ${transactionsCount} extracted transactions. Are you sure?`
        : `This will save the extracted transaction. Are you sure?`;

    Alert.alert("Confirm Save?", descriptionBody, [
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
    ]);
  };

  const handleCancel = useCallback(
    (type: "back" | "cancel") => {
      Alert.alert(
        type === "cancel" ? "Clear Transactions?" : "Go Back?",
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
              router.back();
            },
            style: "destructive",
          },
        ],
      );
    },
    [clearTransactionStore],
  );

  // Save edited transaction
  const handleSaveEdit = (transaction: Transaction) => {
    if (expandedIndex !== null && editTransaction) {
      editTransactionInStore(transaction.id, transaction);
      setExpandedIndex(null);
      setEditTransaction(null);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setExpandedIndex(null);
    setEditTransaction(null);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => handleCancel("back")}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={theme.colors.text.primary}
          />
        </Pressable>
      ),
    });
  }, [handleCancel, navigation]);

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
              {expandedIndex === index && editTransaction ? (
                <InlineTransactionEditForm
                  transaction={editTransaction}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
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
            onPress={() => handleCancel("cancel")}
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
