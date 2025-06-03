import { theme } from "@/utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={24}
                color={theme.colors.text.primary}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialCommunityIcons
                name="chevron-left"
                size={24}
                color={theme.colors.text.primary}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="landing"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
