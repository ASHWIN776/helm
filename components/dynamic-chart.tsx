import { theme } from "@/utils/theme";
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

const colors = [
  theme.colors.primary,
  "#0b0",
  "#00b",
  "#b00",
  "#b0b",
  "#0bb",
  "#bb0",
  "#bbb",
];

export default function DynamicChart({ data }: Props) {
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 8);

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

        const subset = data.slice(0, 10);
        return subset;
      }
      return data;
    };

    const processedChartData = processChartData(
      parsedChartData,
      data.chartConfig.type,
    );

    const yValues = processedChartData.map((item) =>
      data.chartConfig.yKeys.map((key) => +item[key]),
    );
    const minYValue = Math.min(...yValues.flat());
    const maxYValue = Math.max(...yValues.flat());

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
              tickCount: {
                x:
                  processedChartData.length === 1
                    ? 1
                    : processedChartData.length - 1,
                y: processedChartData.length + 1,
              },
              formatXLabel: (value) => {
                const date = new Date(value);
                if (
                  date.toString() !== "Invalid Date" &&
                  !isNaN(date.getTime())
                ) {
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }
                return String(value);
              },
            }}
            domain={{
              y: [minYValue < 10 ? 0 : minYValue - 10, maxYValue + 10],
            }}
          >
            {({ points, chartBounds }) =>
              data.chartConfig?.yKeys.map((yKey, index) => (
                <Bar
                  key={yKey}
                  points={points[yKey as keyof typeof points]}
                  color={colors[index % colors.length]}
                  chartBounds={chartBounds}
                  roundedCorners={{ topLeft: 5, topRight: 5 }}
                  barWidth={processedChartData.length > 5 ? 20 : 30}
                  animate={{ type: "timing", duration: 1000 }}
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
              tickCount: {
                x:
                  processedChartData.length === 1
                    ? 1
                    : processedChartData.length - 1,
                y:
                  processedChartData.length > 10
                    ? 10
                    : processedChartData.length + 1,
              },
              formatXLabel: (value) => {
                const date = new Date(value);
                if (
                  date.toString() !== "Invalid Date" &&
                  !isNaN(date.getTime())
                ) {
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }
                return String(value);
              },
            }}
            domain={{
              y: [minYValue < 10 ? 0 : minYValue - 10, maxYValue + 10],
            }}
          >
            {({ points }) =>
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
