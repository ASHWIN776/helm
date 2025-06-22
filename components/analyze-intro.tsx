import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { theme } from "@/utils/theme";
import { FontAwesome } from "@expo/vector-icons";
import { ANALYZE_PROMPTS } from "@/utils/constants";

interface Props {
  onSelectPrompt: (prompt: string) => void;
}

export default function AnalyzeIntro({ onSelectPrompt }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <View style={styles.promptsContainer}>
        {ANALYZE_PROMPTS.map((prompt, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.promptButton,
              {
                backgroundColor: `${theme.colors.primary}${index === 0 ? "" : "10"}`,
              },
            ]}
            onPress={() => onSelectPrompt(prompt.message)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.promptText,
                index === 0 && styles.primaryPromptText,
              ]}
            >
              {prompt.icon} {prompt.message}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
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
    marginBottom: 24,
  },
  promptsContainer: {
    width: "100%",
    gap: 12,
  },
  promptButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  promptText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    lineHeight: 24,
    fontWeight: "500",
  },
  primaryPromptText: {
    color: theme.colors.white,
    fontWeight: "600",
  },
});
