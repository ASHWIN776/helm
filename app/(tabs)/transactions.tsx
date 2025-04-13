import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TransactionCard } from "@/components/transaction-card";
import { theme } from "@/utils/theme";
import { FlashList } from "@shopify/flash-list";
import { useTransactions } from "@/hooks/useTransactions";
import { StatusBar } from "expo-status-bar";

export default function Transactions() {
  const { transactions, isLoading, error } = useTransactions();

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
              data={transactions}
              estimatedItemSize={83}
              renderItem={({ item }) => (
                <TransactionCard
                  transaction={item}
                  onPress={() => console.log("Transaction pressed:", item.id)}
                />
              )}
            />
          </>
        )}
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
