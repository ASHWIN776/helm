import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme";
import { FontAwesome } from "@expo/vector-icons";

export default function AnalyzeIntro() {
  return (
    <View style={styles.container}>
      <FontAwesome
        name="lightbulb-o"
        size={48}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <Text style={styles.title}>Know your spending!</Text>
      <Text style={styles.description}>
        Get insights about your spending patterns. I'm here to help!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
