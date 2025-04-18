import { Transaction } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/constants";

interface Response {
  error: boolean;
  message: string;
  transaction?: Transaction;
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, Transaction>({
    mutationFn: async (transaction) => {
      const { id } = transaction;
      const response = await fetch(`${BASE_URL}/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      const data: Response = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboardData"],
      });
    },
  });
}
