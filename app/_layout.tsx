import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, usePathname } from "expo-router";
import { StyleSheet, Pressable, Animated } from "react-native";
import { useOverlayStore } from "@/store/overlayStore";
import { AddButton } from "@/components/add-button";
import { ADD_BUTTON_ROUTES } from "@/utils/constants";
import { theme } from "@/utils/theme";
import { useEffect, useRef } from "react";

const queryClient = new QueryClient();

export default function RootLayout() {
  const showOverlay = useOverlayStore((state) => state.isVisible);
  const { hide } = useOverlayStore();
  const pathname = usePathname();
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(overlayAnim, {
      toValue: showOverlay ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [showOverlay, overlayAnim]);

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
      <Animated.View
        pointerEvents={showOverlay ? "auto" : "none"}
        style={[
          styles.overlay,
          {
            opacity: overlayAnim,
            transform: [
              {
                scale: overlayAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.05, 1],
                }),
              },
            ],
          },
        ]}
      >
        {showOverlay && <Pressable style={{ flex: 1 }} onPress={hide} />}
      </Animated.View>
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
