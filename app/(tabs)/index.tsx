import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { theme } from "@/theme";
import { AddButton } from "@/components/add-button";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>March 2025</Text>

        <AddButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
