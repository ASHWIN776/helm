import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    primary: "#007AFF",
    white: "#FFFFFF",
    black: "#000000",
    green: "#10B981",
    red: "#EF4444",
    gray: "#efefef",
    text: {
      primary: "#000000",
      secondary: "#6B7280",
    },
    transaction: {
      expense: "#EF4444",
      income: "#10B981",
    },
    card: {
      background: "#FFFFFF",
      border: "#E5E7EB",
    },
    input: {
      border: "#ddd",
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

export const sharedStyles = StyleSheet.create({
  title: {
    fontSize: theme.spacing.lg,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.input.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
