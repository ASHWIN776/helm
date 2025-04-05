import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { theme } from "@/utils/theme";
import { AddButton } from "@/components/add-button";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>March 2025</Text>
        <Pressable onPress={() => router.push("/confirm-transactions")}>
          <Text>Go to Confirm</Text>
        </Pressable>
        <AddButton />
      </View>
      <StatusBar style="dark" />
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: theme.spacing.lg,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
