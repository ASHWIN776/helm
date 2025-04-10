import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen name="onboarding" />
        <Stack.Screen
          name="new"
          options={{ presentation: "modal", headerShown: true }}
        />
        <Stack.Screen
          name="confirm-transactions"
          options={{
            title: "Confirm Transactions",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="confirm-name"
          options={{
            title: "Save Descriptions",
            headerShown: true,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
