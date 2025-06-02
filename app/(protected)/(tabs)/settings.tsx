import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { authClient } from "@/auth-client";
import { theme } from "@/utils/theme";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  queryClient.clear();
                  router.push("/landing");
                },
              },
            });
          } catch (error) {
            console.error("Logout failed:", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: session?.user?.image ?? "",
          }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{session?.user?.name}</Text>
          <Text style={styles.profileSubtitle}>{session?.user?.email}</Text>
        </View>
        <Feather
          name="chevron-right"
          size={22}
          color={theme.colors.text.primary}
          style={styles.chevron}
        />
      </View>

      {/* Other Settings Card */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.listItem}>
          <Ionicons
            name="person-outline"
            size={20}
            color={theme.colors.text.primary}
          />
          <Text style={styles.listText}>Profile details</Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.text.primary}
            style={styles.chevron}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Feather name="lock" size={20} color={theme.colors.text.primary} />
          <Text style={styles.listText}>Password</Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.text.primary}
            style={styles.chevron}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Feather name="bell" size={20} color={theme.colors.text.primary} />
          <Text style={styles.listText}>Notifications</Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.text.primary}
            style={styles.chevron}
          />
        </TouchableOpacity>
        <View style={styles.listItem}>
          <Feather name="moon" size={20} color={theme.colors.text.primary} />
          <Text style={styles.listText}>Dark mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{
              false: theme.colors.gray,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.white}
          />
        </View>
        <TouchableOpacity
          style={[styles.listItem, styles.logoutItem]}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color={theme.colors.red} />
          <Text style={[styles.listText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.listItem}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={theme.colors.text.primary}
          />
          <Text style={styles.listText}>About application</Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.text.primary}
            style={styles.chevron}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <FontAwesome
            name="comment-o"
            size={20}
            color={theme.colors.text.primary}
          />
          <Text style={styles.listText}>Help/FAQ</Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.text.primary}
            style={styles.chevron}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.listItem, styles.deactivateItem]}>
          <Feather name="trash" size={20} color={theme.colors.red} />
          <Text style={[styles.listText, styles.deactivateText]}>
            Delete my account
          </Text>
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.text.primary}
            style={styles.chevron}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: theme.spacing.md - 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "bold",
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  profileSubtitle: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  },
  profileChevron: {
    marginLeft: 6,
  },
  card: {
    backgroundColor: theme.colors.card.background,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.card.border,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md - 2,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.card.border,
    columnGap: theme.spacing.md,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text.primary,
  },
  chevron: {
    marginLeft: theme.spacing.sm + 2,
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 2,
  },
  logoutText: {
    color: theme.colors.red,
    fontWeight: "600",
  },
  deactivateItem: {
    borderBottomWidth: 0,
    marginTop: 2,
  },
  deactivateText: {
    color: theme.colors.red,
    fontWeight: "600",
  },
});
