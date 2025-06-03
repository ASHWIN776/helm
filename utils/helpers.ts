import { authClient } from "@/auth-client";
import { parse, isToday, isYesterday, format, isValid } from "date-fns";

/**
 * Wrapper for fetch that always sends cookies for authentication.
 * Usage: authenticatedFetch(url, options)
 */
export async function authenticatedFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const cookies = authClient.getCookie();
  const headers = {
    ...(init.headers || {}),
    Cookie: cookies,
  };

  return fetch(input, {
    ...init,
    headers,
  });
}

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

export function string_clamp(value: string, maxLength: number = 20): string {
  if (value.length > maxLength) {
    return value.slice(0, maxLength) + "...";
  }
  return value;
}

// Capitalizes each word in a string (underscore included)
export function formatKey(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
