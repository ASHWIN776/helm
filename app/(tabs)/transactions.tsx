import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TransactionCard } from "../../components/transaction-card";
import { theme } from "../../theme";
import { FlashList } from "@shopify/flash-list";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Transaction } from "../../types";

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    type: "expense",
    description: "Lunch at Subway",
    date: "Today, 2:30 PM",
    amount: 12.99,
  },
  {
    id: "2",
    type: "expense",
    description: "Amazon Purchase",
    date: "Yesterday",
    amount: 49.99,
  },
  {
    id: "3",
    type: "income",
    description: "Freelance Payment",
    date: "Mar 29",
    amount: 500,
  },
];

export default function Transactions() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Transactions</Text>
        <FlashList
          data={sampleTransactions}
          estimatedItemSize={83}
          renderItem={({ item }) => (
            <TransactionCard
              transaction={item}
              onPress={() => console.log("Transaction pressed:", item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />

        <Link href="/new" asChild>
          <Pressable style={styles.add}>
            <AntDesign
              name="pluscircle"
              size={56}
              color={theme.colors.primary}
            />
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  listContent: {
    paddingVertical: theme.spacing.md,
  },
  title: {
    fontSize: theme.spacing.lg,
    fontWeight: "bold",
    color: theme.colors.text.primary,
  },
  add: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 1,
  },
});
