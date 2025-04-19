import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { sharedStyles, theme } from "@/utils/theme";
import { StatusBar } from "expo-status-bar";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useCallback } from "react";
import { formatCurrency } from "@/utils/helpers";

export default function Index() {
  const { data: dashboardData, isLoading, error, refetch } = useDashboardData();

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      );
    }

    if (error || !dashboardData?.data) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>
            {error
              ? `Error: ${error.message}`
              : "Could not load dashboard data."}
          </Text>
        </View>
      );
    }

    const { income, expense } = dashboardData.data;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.summaryContainer}>
          <Text style={styles.periodTitle}>Today</Text>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.inflowText]}>
                {formatCurrency(income.today)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={[styles.summaryValue, styles.outflowText]}>
                {formatCurrency(expense.today)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.periodTitle}>This Week</Text>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.inflowText]}>
                {formatCurrency(income.week)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={[styles.summaryValue, styles.outflowText]}>
                {formatCurrency(expense.week)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.periodTitle}>This Month</Text>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.inflowText]}>
                {formatCurrency(income.month)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={[styles.summaryValue, styles.outflowText]}>
                {formatCurrency(expense.month)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{renderContent()}</View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: theme.colors.red,
    fontSize: theme.spacing.md,
    textAlign: "center",
  },
  title: {
    ...sharedStyles.title,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text.primary,
  },
  summaryContainer: {
    backgroundColor: theme.colors.card.background,
    borderRadius: 16,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  periodTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
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
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
  },
  inflowText: {
    color: theme.colors.green,
  },
  outflowText: {
    color: theme.colors.red,
  },
});
