import { BASE_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

interface DashboardDataResponse {
  error: boolean;
  message: string;
  data: {
    today: {
      income: number;
      expense: number;
      range: {
        start: string;
        end: string;
      };
    };
    week: {
      income: number;
      expense: number;
      range: {
        start: string;
        end: string;
      };
    };
    month: {
      income: number;
      expense: number;
      range: {
        start: string;
        end: string;
      };
    };
    lastMonthTillToday: {
      income: number;
      expense: number;
      range: {
        start: string;
        end: string;
      };
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
