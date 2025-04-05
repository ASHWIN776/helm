import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import ReceiptForm from "@/components/receipt-form";
import { theme } from "@/utils/theme";

export default function New() {
  const { type } = useLocalSearchParams();

  const renderForm = () => {
    switch (type) {
      case "receipt":
        return <ReceiptForm />;
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
