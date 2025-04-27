import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { Transaction } from "@/utils/types";
import { formatCurrency, formatTransactionDate } from "@/utils/helpers";

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
}

// TODO: Use ai to generate the icon name
// const getIconName = (
//   type: TransactionType,
// ): keyof typeof MaterialCommunityIcons.glyphMap => {
//   switch (type) {
//     case "food":
//       return "food";
//     case "shopping":
//       return "shopping";
//     case "transport":
//       return "car";
//     case "entertainment":
//       return "gamepad-variant";
//     default:
//       return "cash";
//   }
// };

export const TransactionCard = ({
  transaction,
  onPress,
}: TransactionCardProps) => {
  const isExpense = transaction.type === "expense";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="food"
              size={24}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {transaction.description}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              Food
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.amount,
                {
                  color: isExpense
                    ? theme.colors.transaction.expense
                    : theme.colors.transaction.income,
                },
              ]}
            >
              {isExpense ? "-" : "+"}
              {formatCurrency(Math.abs(+transaction.amount))}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footerExtension}>
        <Text style={styles.footerText} numberOfLines={1}>
          {formatTransactionDate(transaction.date)}
        </Text>
        <Text style={styles.footerText} numberOfLines={1}>
          {transaction.merchant || ""}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.card.background,
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
    marginBottom: 0,
    padding: theme.spacing.md,
    rowGap: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: theme.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  footerExtension: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.card.footer,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderBottomLeftRadius: theme.borderRadius.md,
    borderBottomRightRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: theme.colors.card.border,
    marginBottom: theme.spacing.sm,
  },
  footerText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
