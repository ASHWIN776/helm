import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import ReceiptForm from "@/components/receipt-form";
import { theme } from "@/utils/theme";
import StatementForm from "@/components/statement-form";

export default function New() {
  const { type } = useLocalSearchParams();

  const renderForm = () => {
    switch (type) {
      case "receipt":
        return <ReceiptForm />;
      case "statement":
        return <StatementForm />;
      case "form":
        return <TransactionForm />;
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
