import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../utils/theme";

interface AnalysisCardProps {
  data: Record<string, any>;
  keys: string[];
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ data, keys }) => {
  return (
    <View style={styles.card}>
      {keys.map((key) => (
        <View key={key} style={styles.cardRow}>
          <Text style={styles.cardLabel}>
            {key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1")}
          </Text>
          <Text style={styles.cardValue}>{data[key]?.toString() || "-"}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: "500",
    color: theme.colors.text.primary,
    flex: 2,
  },
});
