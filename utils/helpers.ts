export const formatCurrency = (amount: number) => {
  return `¥${amount.toFixed(2)}`;
};

export function formatTransactionDate(dateString: string): string {
  // Parse the date string
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: "${dateString}" could not be parsed.`);
  }

  // Validate the format: yyyy-MM-dd (basic check)
  const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  if (!isValidFormat) {
    throw new Error(
      `Invalid date format: "${dateString}". Expected format is "yyyy-MM-dd".`,
    );
  }

  const now = new Date();

  // Remove time for comparison
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const oneDay = 24 * 60 * 60 * 1000;
  const diffInTime = nowOnly.getTime() - dateOnly.getTime();

  if (diffInTime === 0) {
    return "Today";
  }

  if (diffInTime === oneDay) {
    return "Yesterday";
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}
