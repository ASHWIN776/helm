import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "@/utils/theme";

interface LastMonthComparisonProps {
  current: number;
  lastMonth: number;
}

export default function LastMonthComparison({
  current,
  lastMonth,
}: LastMonthComparisonProps) {
  if (!(lastMonth > 0)) return null;
  const diff = current - lastMonth;
  const percent = (diff / lastMonth) * 100;
  const isIncrease = diff > 0;

  // const Arrow = () => (
  //   <View
  //     style={[
  //       styles.arrowContainer,
  //       {
  //         backgroundColor: isIncrease ? theme.colors.red : theme.colors.green,
  //       },
  //     ]}
  //   >
  //     <Text style={styles.arrow}>{isIncrease ? "\u2191" : "\u2193"}</Text>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.secondaryText}>Expenses at</Text>
      {/* For now without arrow looks better */}
      {/* <Arrow /> */}
      <Text
        style={[
          styles.text,
          { color: isIncrease ? theme.colors.red : theme.colors.green },
        ]}
      >
        {isIncrease ? "+" : "-"}
        {Math.abs(percent).toFixed(0)}%{" "}
        <Text style={styles.secondaryText}>than this time last month</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 6,
    borderColor: theme.colors.card.border,
    borderWidth: 1,
    borderRadius: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  arrowContainer: {
    backgroundColor: theme.colors.red,
    borderRadius: 99,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryText: {
    fontWeight: "400",
    color: theme.colors.text.secondary,
    fontSize: 12,
  },
});
