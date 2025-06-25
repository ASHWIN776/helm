export const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL as string;

export const ADD_BUTTON_ROUTES = ["/", "/transactions"];

export const ANALYZE_PROMPTS = [
  {
    icon: "💰",
    message: "Money spent on milk this month?",
  },
  {
    icon: "🍜",
    message: "Break down my food expenses",
  },
  {
    icon: "📈",
    message: "Spending trend for this week?",
  },
];
