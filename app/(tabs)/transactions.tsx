import {
  RefreshControl,
  SafeAreaView,
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

export default function Transactions() {
  const { data: transactions, isLoading, error, refetch } = useTransactions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { mutate: editTransaction, isPending: isEditing } =
    useEditTransaction();

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
        alert(err.message || "Failed to update transaction");
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
            <Text>Loading...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text>Error loading transactions</Text>
          </View>
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
              submitLabel="Save Changes"
              isPending={isEditing}
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
