import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, usePathname } from "expo-router";
import { StyleSheet, Pressable } from "react-native";
import { useOverlayStore } from "@/store/overlayStore";
import { AddButton } from "@/components/add-button";
import { ADD_BUTTON_ROUTES } from "@/utils/constants";
import { theme } from "@/utils/theme";

const queryClient = new QueryClient();

export default function RootLayout() {
  const showOverlay = useOverlayStore((state) => state.isVisible);
  const { hide } = useOverlayStore();
  const pathname = usePathname();

  const showAddButton = ADD_BUTTON_ROUTES.some((route) => pathname === route);

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
      {showOverlay && <Pressable onPress={hide} style={styles.overlay} />}
      {showAddButton && <AddButton />}
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay,
    zIndex: 1,
  },
});
