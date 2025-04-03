import { ChartConfig, Result } from "@/utils/types";
import { useFont } from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { Bar, CartesianChart, Line } from "victory-native";

interface Props {
  data: {
    chartConfig: ChartConfig;
    results: Result[];
  };
}

const colors = ["#000", "#0b0", "#00b", "#b00", "#b0b", "#0bb", "#bb0", "#bbb"];

export default function DynamicChart({ data }: Props) {
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 10);

  const renderChart = () => {
    const parsedChartData = data.results.map((item) => {
      const parsedItem: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(item)) {
        parsedItem[key] = isNaN(Number(value)) ? value : Number(value);
      }
      return parsedItem;
    });

    const processChartData = (data: Result[], chartType: string) => {
      if (chartType === "bar" || chartType === "pie") {
        if (data.length <= 8) {
          return data;
        }

        const subset = data.slice(0, 20);
        return subset;
      }
      return data;
    };

    const processedChartData = processChartData(
      parsedChartData,
      data.chartConfig.type,
    );

    switch (data.chartConfig.type) {
      case "bar":
        return (
          <CartesianChart
            data={processedChartData}
            xKey={data.chartConfig.xKey}
            yKeys={data.chartConfig.yKeys as never[]}
            domainPadding={{ left: 30, right: 30 }}
            axisOptions={{
              font,
            }}
          >
            {/* 👇 render function exposes various data, such as points. */}
            {({ points, chartBounds }) =>
              // 👇 and we'll use the Line component to render a line path.
              data.chartConfig?.yKeys.map((yKey, index) => (
                <Bar
                  key={yKey}
                  points={points[yKey as keyof typeof points]}
                  color={colors[index % colors.length]}
                  chartBounds={chartBounds}
                  roundedCorners={{ topLeft: 10, topRight: 10 }}
                />
              ))
            }
          </CartesianChart>
        );
      case "line":
        return (
          <CartesianChart
            data={processedChartData}
            xKey={data.chartConfig.xKey}
            yKeys={data.chartConfig.yKeys as never[]}
            domainPadding={{ left: 30, right: 30 }}
            axisOptions={{
              font,
            }}
          >
            {/* 👇 render function exposes various data, such as points. */}
            {({ points, chartBounds }) =>
              // 👇 and we'll use the Line component to render a line path.
              data.chartConfig?.yKeys.map((yKey, index) => (
                <Line
                  key={yKey}
                  points={points[yKey as keyof typeof points]}
                  color={colors[index % colors.length]}
                />
              ))
            }
          </CartesianChart>
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderChart()}</View>;
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
});
