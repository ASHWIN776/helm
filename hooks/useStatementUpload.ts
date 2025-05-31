import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import { authenticatedFetch } from "../utils/helpers";
import { UnsavedTransaction } from "@/utils/types";

interface StatementUploadData {
  fileUri: string;
}

interface UploadResponse {
  error: boolean;
  message: string;
  transactions: UnsavedTransaction[] | null;
}

export function useStatementUpload() {
  return useMutation<UploadResponse, Error, StatementUploadData>({
    mutationFn: async ({ fileUri }) => {
      const formData = new FormData();
      formData.append("statement", {
        uri: fileUri,
        type: "text/csv",
        name: "statement.csv",
      } as any);

      const response = await authenticatedFetch(
        `${BASE_URL}/api/transactions/statement`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload statement");
      }

      const data: UploadResponse = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      return data;
    },
  });
}
