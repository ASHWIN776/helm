import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "@/utils/theme";
import { formatCurrency } from "@/utils/helpers";

type TransactionSummaryProps = {
  type: "statement" | "receipt" | "text";
  summaryData: {
    income?: number;
    expense?: number;
    total?: number;
  };
};

export function TransactionSummary({
  type,
  summaryData,
}: TransactionSummaryProps) {
  return (
    <View style={styles.summaryContainer}>
      {type === "statement" || type === "text" ? (
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Cash Inflow</Text>
            <Text style={[styles.summaryValue, styles.inflowText]}>
              {formatCurrency(summaryData.income || 0)}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Cash Outflow</Text>
            <Text style={[styles.summaryValue, styles.outflowText]}>
              {formatCurrency(summaryData.expense || 0)}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={[styles.summaryValue, styles.totalText]}>
              {formatCurrency(summaryData.total || 0)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.gray,
    borderRadius: 12,
    padding: theme.spacing.md,
  },
  summaryContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  inflowText: {
    color: theme.colors.green,
  },
  outflowText: {
    color: theme.colors.red,
  },
  totalText: {
    color: theme.colors.text.primary,
  },
});
