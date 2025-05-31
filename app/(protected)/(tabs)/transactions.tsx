import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TransactionCard } from "@/components/transaction-card";
import { theme } from "@/utils/theme";
import { FlashList } from "@shopify/flash-list";
import { useTransactions } from "@/hooks/useTransactions";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { Modal } from "react-native";
import TransactionForm from "@/components/transaction-form";
import { Transaction } from "@/utils/types";
import { useEditTransaction } from "@/hooks/useEditTransaction";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";

export default function Transactions() {
  const { data: transactions, isLoading, error, refetch } = useTransactions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { mutate: editTransaction, isPending: isEditing } =
    useEditTransaction();
  const { mutate: deleteTransaction, isPending: isDeleting } =
    useDeleteTransaction();

  const handleCardPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
  };

  const handleEditSubmit = (updatedTx: Transaction) => {
    editTransaction(updatedTx, {
      onSuccess: () => {
        setModalVisible(false);
        setSelectedTransaction(null);
      },
      onError: (err) => {
        Alert.alert(err.message || "Failed to update transaction");
      },
    });
  };

  const handleDelete = () => {
    deleteTransaction(selectedTransaction as Transaction, {
      onSuccess: () => {
        setModalVisible(false);
        setSelectedTransaction(null);
      },
      onError: (error) => {
        console.error("Error deleting transaction:", error);
        Alert.alert("Error deleting transaction. Please try again.");
      },
    });
  };

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        ) : error ? (
          <ScrollView
            contentContainerStyle={styles.errorContainer}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
          >
            <Text>Error loading transactions</Text>
          </ScrollView>
        ) : (
          <>
            <FlashList
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              data={transactions?.data ?? []}
              estimatedItemSize={83}
              renderItem={({ item }) => (
                <TransactionCard
                  transaction={item}
                  onPress={() => handleCardPress(item)}
                />
              )}
            />
          </>
        )}
        <Modal
          visible={modalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={handleModalClose}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            <TransactionForm
              transaction={selectedTransaction}
              onSubmit={handleEditSubmit}
              submitLabel="Save"
              isPending={isEditing}
              showDelete
              isPendingDelete={isDeleting}
              onDelete={handleDelete}
            />
          </View>
        </Modal>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    rowGap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
});
