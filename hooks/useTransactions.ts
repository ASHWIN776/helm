import { Transaction } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/constants";

interface TransactionsResponse {
  error: boolean;
  message: string;
  data: Transaction[];
}

export const useTransactions = () => {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery<TransactionsResponse>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/transactions`);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return response.json();
    },
  });

  return {
    transactions: transactions?.data ?? [],
    isLoading,
    error,
  };
};
