import { AnalysisResponse } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/constants";
import { authenticatedFetch } from "@/utils/helpers";

const getAnalysis = async (message: string) => {
  try {
    const response = await authenticatedFetch(`${BASE_URL}/api/analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: message }),
    });
    const data = await response.json();

    if (response.ok || [400, 500].includes(response.status)) {
      return data;
    }

    throw new Error("Fetch Error, status code: " + response.status);
  } catch (error) {
    console.error("Error fetching analysis:", error);
    throw new Error("Failed to fetch analysis");
  }
};

export const useAnalysis = (message: string) => {
  return useQuery<AnalysisResponse>({
    queryKey: ["analysis", message],
    queryFn: () => getAnalysis(message),
    enabled: !!message,
  });
};
