import { parse, isToday, isYesterday, format, isValid } from "date-fns";

export const formatCurrency = (amount: number) => {
  return `¥${amount.toFixed(2)}`;
};

export function formatTransactionDate(dateString: string): string {
  const date = parse(dateString, "yyyy-MM-dd", new Date());

  if (!isValid(date)) {
    throw new Error(`Invalid date: "${dateString}"`);
  }

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "MMM d, yyyy");
}
