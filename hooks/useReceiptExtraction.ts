import { useMutation } from "@tanstack/react-query";
import { UnsavedTransaction } from "@/utils/types";
import { BASE_URL } from "@/utils/constants";

interface ReceiptExtractionData {
  imageUri: string;
}

interface ExtractionResponse {
  error: boolean;
  message: string;
  transactions: UnsavedTransaction[] | null;
}

export function useReceiptExtraction() {
  return useMutation<ExtractionResponse, Error, ReceiptExtractionData>({
    mutationFn: async ({ imageUri }) => {
      const imageType = imageUri.split(".").pop();

      const formData = new FormData();
      formData.append("bill", {
        uri: imageUri,
        type: `image/${imageType}`,
        name: `receipt.${imageType}`,
      } as any);

      const response = await fetch(`${BASE_URL}/api/transactions/extract`, {
        method: "POST",
        body: formData,
      });

      const data: ExtractionResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to extract receipt details");
      }

      if (data.error) {
        throw new Error(data.message);
      }

      return data;
    },
  });
}
