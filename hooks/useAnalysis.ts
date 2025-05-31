import { AnalysisResponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/constants";
import { authenticatedFetch } from "@/utils/helpers";

const getAnalysis = async (message: string) => {
  const response = await authenticatedFetch(`${BASE_URL}/api/analysis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: message }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch analysis");
  }
  return response.json();
};

export const useAnalysis = (message: string) => {
  return useQuery<AnalysisResponse>({
    queryKey: ["analysis", message],
    queryFn: () => getAnalysis(message),
    enabled: !!message,
  });
};
