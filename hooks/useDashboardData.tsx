import { BASE_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

interface DashboardDataResponse {
  error: boolean;
  message: string;
  data: {
    expense: {
      today: number;
      week: number;
      month: number;
      lastMonthTillToday: number;
    };
    income: {
      today: number;
      week: number;
      month: number;
    };
  } | null;
}

export const useDashboardData = () => {
  return useQuery<DashboardDataResponse>({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/dashboard`);
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      return response.json();
    },
  });
};
