import { Transaction } from "@/types";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://ae3a-210-14-55-77.ngrok-free.app";

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
