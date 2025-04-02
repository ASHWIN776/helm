import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../utils/theme";
import { Transaction } from "@/utils/types";

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

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onPress,
}) => {
  const isExpense = transaction.type === "expense";
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="food"
          size={24}
          color={theme.colors.primary}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {transaction.description.charAt(0).toUpperCase() +
            transaction.description.slice(1)}
        </Text>
        <Text style={styles.date}>{transaction.date}</Text>
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
          {isExpense ? "-" : "+"}¥{Math.abs(transaction.amount).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
    marginBottom: theme.spacing.sm,
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
  date: {
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
});
