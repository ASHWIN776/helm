import { AnalysisResponse } from "@/utils/types";
import { View, StyleSheet, Text, Pressable } from "react-native";
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
  const [activeTab, setActiveTab] = useState<TabType>("list");

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
    <View style={styles.container}>
      <View style={styles.tabContainer}>
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
            <Text style={styles.submittedMessage}>
              {data.chartConfig?.description}
            </Text>
            <DynamicChart
              data={{
                results: data.results,
                chartConfig: data.chartConfig,
              }}
            />
          </>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
  submittedMessage: {
    fontSize: 18,
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
  },
  tabContainer: {
    flexDirection: "row",
    marginVertical: 16,
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
});
