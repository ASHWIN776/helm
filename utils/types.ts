export type TransactionType = "expense" | "income";

export type Transaction = {
  id: string;
  date: string;
  amount: string;
  description: string;
  type: TransactionType;
};

export type UnsavedTransaction = Omit<Transaction, "id">;

export type ChartConfig = {
  description: string; // Description of what the chart shows
  takeaway: string; // Main takeaway from the chart
  type: "bar" | "line" | "area" | "pie"; // Type of chart
  title: string; // Chart title
  xKey: string; // Key for x-axis
  yKeys: string[]; // Keys for y-axis values
  multipleLines?: boolean; // For line charts: whether to compare groups
  measurementColumn?: string; // For line charts: quantitative column
  lineCategories?: string[]; // For line charts: categories for comparison
  colors?: Record<string, string>; // Custom colors for chart elements
  legend: boolean; // Whether to show legend
};

export type Result = Record<string, string | number>;

export interface AnalysisResponse {
  error: boolean;
  message: string;
  results: Result[];
  chartConfig: ChartConfig | null;
  thinking: {
    sql: string;
  };
}
