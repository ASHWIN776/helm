import { BASE_URL } from "@/utils/constants";
import { authenticatedFetch } from "@/utils/helpers";
import { Transaction } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Response {
  error: boolean;
  message: string;
  transaction?: Transaction;
}

export function useEditTransaction() {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, Transaction>({
    mutationFn: async (transaction) => {
      const { id, ...rest } = transaction;
      const response = await authenticatedFetch(
        `${BASE_URL}/api/transactions/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...rest,
            amount: parseFloat(rest.amount),
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }
      const data: Response = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
    },
  });
}
