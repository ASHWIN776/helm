import { Pressable, StyleSheet, Text, View, SafeAreaView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "@/theme";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>March 2025</Text>

        <Link href="/new" asChild>
          <Pressable style={styles.add}>
            <AntDesign
              name="pluscircle"
              size={56}
              color={theme.colors.primary}
            />
          </Pressable>
        </Link>
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
  add: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 1,
  },
});
