import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTransactionStore } from "@/store/transactionStore";
import { TransactionCard } from "@/components/transaction-card";
import { theme } from "@/utils/theme";
import { router } from "expo-router";

export default function Confirm() {
  const transactions = useTransactionStore((state) => state.transactions);
  const clearTransactionStore = useTransactionStore(
    (state) => state.clearStore,
  );

  const handleConfirm = () => {
    // TODO: Implement transaction confirmation
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Confirmation?",
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlashList
          data={transactions}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
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
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Confirm</Text>
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
});
