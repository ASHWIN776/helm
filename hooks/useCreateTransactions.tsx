import { BASE_URL } from "@/utils/constants";
import { authenticatedFetch } from "@/utils/helpers";
import { UnsavedTransaction } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

interface Response {
  success: boolean;
  message: string;
}

export function useCreateTransactions() {
  return useMutation<Response, Error, UnsavedTransaction[]>({
    mutationFn: async (transactions) => {
      const response = await authenticatedFetch(
        `${BASE_URL}/api/transactions`,
        {
          method: "POST",
          body: JSON.stringify({
            transactions: transactions.map((t) => ({
              ...t,
              amount: parseFloat(t.amount),
            })),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create transactions", { cause: response });
      }

      const data: Response = await response.json();

      if (!data.success) {
        throw new Error(data.message, { cause: data });
      }

      return data;
    },
  });
}
