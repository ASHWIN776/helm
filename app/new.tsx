import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import ReceiptForm from "@/components/receipt-form";
import { theme } from "@/utils/theme";
import StatementForm from "@/components/statement-form";
import TransactionForm from "@/components/transaction-form";
import TextTransactionInput from "@/components/text-transaction-input";
import { useEffect } from "react";

export default function New() {
  const { type } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    let title = "";

    switch (type) {
      case "receipt":
        title = "Receipt";
        break;
      case "statement":
        title = "Statement";
        break;
      case "form":
        title = "Transaction";
        break;
      case "text":
        title = "Text";
        break;
      default:
        title = "New";
    }

    navigation.setOptions({
      title,
    });
  }, [type, navigation]);

  const renderForm = () => {
    switch (type) {
      case "receipt":
        return <ReceiptForm />;
      case "statement":
        return <StatementForm />;
      case "form":
        return <TransactionForm />;
      case "text":
        return <TextTransactionInput />;
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderForm()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
});
