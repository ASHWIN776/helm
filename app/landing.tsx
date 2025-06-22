import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "@/utils/theme";
import { authClient } from "@/auth-client";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingScreen() {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.title}>helm</Text>
          <Text style={styles.subtitle}>Steer your finances with AI</Text>
          <Pressable onPress={() => router.push("/")}>
            <Text>Go to Dashboard</Text>
          </Pressable>
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
          >
            <View style={styles.googleButtonContent}>
              <AntDesign
                name="google"
                size={22}
                color={theme.colors.white}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          <Text
            style={styles.emailLink}
            onPress={() => router.push("/sign-in")}
          >
            Continue with Email
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  topSection: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: theme.spacing.xl,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: 10,
    textAlign: "center",
  },
  bottomSection: {
    width: "100%",
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  googleButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
    width: "100%",
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
    color: theme.colors.white,
  },
  emailLink: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.2,
    cursor: "pointer",
  },
});
