import { AnalysisResponse } from "@/utils/types";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import DynamicChart from "./dynamic-chart";
import { FlashList } from "@shopify/flash-list";
import { useState, useMemo } from "react";
import { AnalysisCard } from "./analysis-card";
import { theme } from "@/utils/theme";

interface Props {
  data: AnalysisResponse;
}

type TabType = "list" | "chart";

export default function AnalysisResult({ data }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("chart");

  const listHeaders = useMemo(() => {
    if (data.results && data.results.length > 0) {
      return Object.keys(data.results[0]);
    }
    return [];
  }, [data.results]);

  const renderResultCard = ({ item }: { item: any }) => {
    return <AnalysisCard data={item} keys={listHeaders} />;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {data.results.length > 0 ? (
        <>
          <Text style={styles.chartTitle}>{data.chartConfig?.title}</Text>
          <Text style={styles.chartDescription}>
            Here's what you are looking for,
          </Text>
          {data.insight ? (
            <View style={styles.insightCard}>
              <Text style={styles.insightText}>{data.insight}</Text>
            </View>
          ) : undefined}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, activeTab === "chart" && styles.activeTab]}
              onPress={() => setActiveTab("chart")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "chart" && styles.activeTabText,
                ]}
              >
                Chart
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === "list" && styles.activeTab]}
              onPress={() => setActiveTab("list")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "list" && styles.activeTabText,
                ]}
              >
                List
              </Text>
            </Pressable>
          </View>

          {activeTab === "list" ? (
            <View style={styles.listContainer}>
              <FlashList
                data={data.results}
                renderItem={renderResultCard}
                estimatedItemSize={150}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.listContent}
              />
            </View>
          ) : (
            data.chartConfig && (
              <>
                <Text style={styles.chartDescription}>
                  {data.chartConfig?.takeaway}
                </Text>
                <DynamicChart
                  data={{
                    results: data.results,
                    chartConfig: data.chartConfig,
                  }}
                />
                <Text style={styles.chartDescription}>
                  {data.chartConfig?.description}
                </Text>
              </>
            )
          )}
        </>
      ) : (
        <Text style={[styles.chartDescription, { color: theme.colors.red }]}>
          {data.message}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
  contentContainer: {
    paddingVertical: 16,
    rowGap: 16,
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    backgroundColor: theme.colors.gray,
    padding: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: theme.borderRadius.md,
  },
  activeTab: {
    backgroundColor: theme.colors.white,
  },
  tabText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    fontWeight: "500",
  },
  activeTabText: {
    color: theme.colors.black,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 4,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  chartDescription: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  insightCard: {
    justifyContent: "space-between",
    backgroundColor: theme.colors.card.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
  insightCardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.text.secondary,
    marginBottom: 4,
    textAlign: "center",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  insightText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    lineHeight: 20,
  },
});
