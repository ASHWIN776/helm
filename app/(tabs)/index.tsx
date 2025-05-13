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
import LastMonthComparison from "@/components/last-month-comparison";
import { format } from "date-fns";

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
        <ScrollView
          contentContainerStyle={styles.centered}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.errorText}>
            {error
              ? `Error: ${error.message}`
              : "Could not load dashboard data."}
          </Text>
        </ScrollView>
      );
    }

    const { today, week, month, lastMonthTillToday } = dashboardData.data;
    const todayTitle = format(today.range.start, "MMM d, yyyy");
    const weekRange = `${format(week.range.start, "MMM d")} - ${format(week.range.end, "MMM d, yyyy")}`;
    const monthTitle = format(month.range.start, "MMMM yyyy");

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.summaryContainer}>
          <View style={styles.periodContainer}>
            <Text style={styles.periodTitle}>Today</Text>
            <Text style={styles.periodSubtitle}>{todayTitle}</Text>
          </View>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.inflowText]}>
                {formatCurrency(today.income)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={[styles.summaryValue, styles.outflowText]}>
                {formatCurrency(today.expense)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.periodContainer}>
            <Text style={styles.periodTitle}>This Week</Text>
            <Text style={styles.periodSubtitle}>{weekRange}</Text>
          </View>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryValue, styles.inflowText]}>
                {formatCurrency(week.income)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Expense</Text>
              <Text style={[styles.summaryValue, styles.outflowText]}>
                {formatCurrency(week.expense)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.periodContainer}>
            <Text style={styles.periodTitle}>This Month</Text>
            <Text style={styles.periodSubtitle}>{monthTitle}</Text>
          </View>
          <View>
            <View style={styles.summaryContent}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Income</Text>
                <Text style={[styles.summaryValue, styles.inflowText]}>
                  {formatCurrency(month.income)}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Expense</Text>
                <Text style={[styles.summaryValue, styles.outflowText]}>
                  {formatCurrency(month.expense)}
                </Text>
              </View>
            </View>
            <LastMonthComparison
              current={month.expense}
              lastMonth={lastMonthTillToday.expense}
            />
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
    rowGap: theme.spacing.md,
  },
  periodContainer: {
    rowGap: theme.spacing.xs,
  },
  periodTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },
  periodSubtitle: {
    fontSize: 13,
    color: theme.colors.text.secondary,
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
