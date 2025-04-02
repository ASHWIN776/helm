import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { theme } from "@/utils/theme";
import { AddButton } from "@/components/add-button";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>March 2025</Text>

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
