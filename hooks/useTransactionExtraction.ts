import { useMutation } from "@tanstack/react-query";
import { UnsavedTransaction } from "@/utils/types";
import { BASE_URL } from "@/utils/constants";
import { authenticatedFetch } from "@/utils/helpers";

// Allow either image or text input
type TransactionExtractionInput =
  | { imageUri: string; text?: undefined }
  | { text: string; imageUri?: undefined };

interface ExtractionResponse {
  error: boolean;
  message: string;
  transactions: UnsavedTransaction[] | null;
}

export function useTransactionExtraction() {
  return useMutation<ExtractionResponse, Error, TransactionExtractionInput>({
    mutationFn: async (input) => {
      let options: RequestInit = {
        method: "POST",
      };
      if (input.text) {
        options = {
          ...options,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input.text }),
        };
      } else if (input.imageUri) {
        const imageType = input.imageUri.split(".").pop();
        const formData = new FormData();
        formData.append("bill", {
          uri: input.imageUri,
          type: `image/${imageType}`,
          name: `receipt.${imageType}`,
        } as any);

        options = {
          ...options,
          body: formData,
        };
      } else {
        throw new Error("Either text or imageUri must be provided");
      }

      const response = await authenticatedFetch(
        `${BASE_URL}/api/transactions/extract`,
        options,
      );
      if (!response.ok) {
        throw new Error("Failed to extract transaction details");
      }
      const data: ExtractionResponse = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      return data;
    },
  });
}
